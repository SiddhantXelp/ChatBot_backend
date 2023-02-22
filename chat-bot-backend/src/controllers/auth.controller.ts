import { Request, Response } from "express";

import { AuthModel } from "../models/auth.model";
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken"


const signup = async (req: Request, res: Response) =>{
    const { email, password,orgName,typeOfOrg,phoneNumber,street1,street2,city,country,zipCode } = req.body;
    if(!email || !password || !orgName || !typeOfOrg || !city || !country || !zipCode ){
        res.send({error:'Pass Required Params'})
    }
      const user = await AuthModel.findOne({email: email });
      bcrypt.hash(password, 10).then(async (hash)=>{
          if (!user) {
              let newUser = new AuthModel({
                  email: email,
                  password: hash,
                  orgName: orgName,
                  typeOfOrg: typeOfOrg,
                  phoneNumber: phoneNumber,
                  street1: street1,
                  street2: street2,
                  city: city,
                  country: country,
                  zipCode: zipCode,
                  
              });
              let saved = await newUser.save();
              console.log("new User:",saved);
              if(saved.email) {
                  res.send({message:"user created successfully"});
              }
              else{
                  res.send({ error: saved.errors });
              }
          }
          else{
              res.send({error:"User Already Exist"});
          }
      }).catch((err)=>{
          res.send({ error: err});
      })
     
}

const login = async (req: Request,res: Response)=>{
    const { email, password } = req.body;
    if(!email || !password){
        res.send({error:"Pass Required params"})
    }
  
    var user = await AuthModel.findOne({email: email });
    console.log("user", user)
  
    if (!user) res.send({ error: "User Doesn't Exist" });
    else{
        const dbPassword = user.password;
        bcrypt.compare(password, dbPassword).then((match) => {
          if (!match) {
            res.send({ error: "Invalid Credentials!" });
          } else {
                const accessToken = sign(
                  { email: user?.email, id: user?._id },"secretjwttoken", {expiresIn: '1h'}
                );
                res.send({ message:"login successfull", token: accessToken});
          }
        })
        .catch((err)=>{
            res.send({error: err});
        });
    }
}
export {signup, login}