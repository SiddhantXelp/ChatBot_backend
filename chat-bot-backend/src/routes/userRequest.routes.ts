import {
    createUserRequest,
    getUserRequest,
    getUserRequestById,
    updateRequest,
    updateUserRequest,
} from "../controllers/userRequest.controller";

import { Router } from "express";

const userRequestRouter = Router();
  
  // responseRouter.get("/request", (req, res) => {
  //   getRequest(req, res);
  // });
  
  userRequestRouter.get("/userRequest", (req, res) => {
    getUserRequest(req, res);
  });
  userRequestRouter.get("/userRequest/:id", (req, res) => {
    getUserRequestById(req, res);
  });
  userRequestRouter.post("/userRequest", (req, res) => {
    createUserRequest(req, res);
  });
  
  userRequestRouter.put("/r/:id", (req, res) => {
      updateRequest(req, res);
    });
  userRequestRouter.put("/userRequest/:id", (req, res) => {
    updateUserRequest(req, res);
  });
  
  export default userRequestRouter;
  