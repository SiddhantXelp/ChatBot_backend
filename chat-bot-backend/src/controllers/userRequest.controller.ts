import { Document, Schema, Types, model } from "mongoose";
import { RelationModel, RespRelation } from "../models/response.relation";
import { Request, Response, response } from "express";

import { ObjectId } from "mongoose";
import { RequestModel } from "../models/request.model";
import { Theme } from "./../models/widget.model";
import { UserRequestModel } from "./../models/userRequest.model";
import mongoose from "mongoose";

const getUserRequest = async (req: Request, res: Response) => {
  console.log("hello");
  const role = await UserRequestModel.find().populate("children");
  console.log(role);

  if (!role) {
    return res.status(404).json({ message: `Request with id "" not found.` });
  }

  return res.status(200).json({ data: role });
};

const getUserRequestById = async (req: Request, res: Response) => {
  console.log("hello");
  const { id } = req.params;

  const role = await UserRequestModel.findOne({ _id: id }).populate("children");
  console.log(role);
  if (!role) {
    return res.status(404).json({ message: `Request with id "" not found.` });
  }

  return res.status(200).json({ data: role });
};

const createUserRequest = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  //const id = req.params;
  var newId = Math.random()
  const userrequest = await UserRequestModel.findOne({
    uuid: uuid,
  });
  const request:any = await RequestModel.findOne({
    uuid: uuid,
  })
  const { title, tags, description, type, delay } = req.body;
  if (!userrequest && !request) {
    const UserRequest = new UserRequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: tags,
      description: description,
      title: title,
      type: type,
      delay: delay,
      uuid: uuid
    });
    console.log(UserRequest);
    UserRequest.save(function (err) {
      if (err) return handleError(err);
      const responsee = new RequestModel({
        _id: new mongoose.Types.ObjectId(),
        tags: tags,
        description: description,
        title: title,
        type: type,
        delay: delay,
        uuid: newId
      });
      responsee.save(function (err) {
        if (err) return handleError(err);
      });
      //console.log(responsee);
      // UserRequest.children.push(responsee);
      // console.log(UserRequest);
      // UserRequest.save();
      res.status(201).json({ data: UserRequest });
    });
  } else if (userrequest && !request) {
    const responsee = new RequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: tags,
      description: description,
      title: title,
      type: type,
      delay: delay,
      uuid: newId
    });
    responsee.save(function (err) {
      if (err) return handleError(err);
    });
    userrequest.children.push(responsee._id);
    console.log(request);
    userrequest.save();
    res.status(201).json({ data: responsee });
  }
  else if(request&&!userrequest) {
    const UserRequest = new UserRequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: request.tags,
      description: request.description,
      title: request.title,
      type: request.type,
      delay: request.delay,
      uuid: request.uuid
    });
    console.log(UserRequest);
    UserRequest.save(function (err) {
      if (err) return handleError(err);
      const responsee = new RequestModel({
        _id: new mongoose.Types.ObjectId(),
        tags: tags,
        description: description,
        title: title,
        type: type,
        delay: delay,
        uuid: newId
      });
      responsee.save(function (err) {
        if (err) return handleError(err);
      });
      //console.log(responsee);
      UserRequest.children.push(responsee._id);
      // console.log(UserRequest);
       UserRequest.save();
      res.status(201).json({ data: UserRequest });

    })
    // UserRequest.requests.push(responsee);
    // UserRequest.save();

  }
  else if(request&&userrequest)
  {
    const responsee = new RequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: tags,
      description: description,
      title: title,
      type: type,
      delay: delay,
      uuid: newId
    });
    responsee.save(function (err) {
      if (err) return handleError(err);
    });
    userrequest.children.push(responsee._id);
    console.log(request);
    userrequest.save();
    res.status(201).json({ data: responsee });
  }
  
  function handleError(err: NativeError): void {
    throw new Error("Function not implemented.");
  }
}
  const updateUserRequest = async (req: Request, res: Response) => {
    const { title, tags, description, type, delay } = req.body;
    const id = req.params.id;
    const used = await UserRequestModel.findOne({
      title,
      description,
      tags,
      type,
      delay,
    });
    if (!used) {
      return UserRequestModel.findById(id)
        .then((user) => {
          if (user) {
            user.set(req.body);

            return user
              .save()
              .then((user) => res.status(201).json({ user }))
              .catch((error) => res.status(500).json({ error }));
          } else {
            return res.status(404).json({ message: "not found" });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(404).json({ message: "already exists" });
    }
  };

  const updateRequest = async (req: Request, res: Response) => {
    const { title, tags, description, type, delay } = req.body;
    const id = req.params.id;
    //console.log(id);
    const used = await RequestModel.findOne({
      title,
      description,
      tags,
      type,
      delay,
    });
    //
    console.log(used);
    if (!used) {
      return RequestModel.findById(id)
        .then((request) => {
          if (request) {
            request.set(req.body);

            return request
              .save()
              .then((request) => res.status(201).json({ request }))
              .catch((error) => res.status(500).json({ error }));
          } else {
            return res.status(404).json({ message: "not found" });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      res.status(404).json({ message: "already exists" });
    }
  };
  export {
    createUserRequest,
    getUserRequest,
    getUserRequestById,
    updateUserRequest,
    updateRequest,
  };
