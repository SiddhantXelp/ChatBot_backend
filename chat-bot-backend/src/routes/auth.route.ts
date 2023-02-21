import { Router } from "express";
import {signup,login} from "../controllers/auth.controller";


const authRouter = Router()

authRouter.post("/signup", async (req, res) => {
    signup(req,res)
});
authRouter.post("/login", async (req, res) => {
    login(req,res);
});
 
export default authRouter;