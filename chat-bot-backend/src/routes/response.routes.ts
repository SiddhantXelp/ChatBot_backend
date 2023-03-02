import {
  ModifyResponse,
  createResponse,
  createResponseChild,
  deleteResponse,
  getRequest,
  getRequestAndRelation,
  getRequestById,
  updateResponse,
} from "../controllers/response.controller";
import { createWidget, updateWidget } from "../controllers/widget.controller";

import { ResponseModel } from "../models/response.model";
import { Router } from "express";

const responseRouter = Router();

// responseRouter.get("/request", (req, res) => {
//   getRequest(req, res);
// });

responseRouter.get("/request/:id", (req, res) => {
  getRequestAndRelation(req, res);
});

responseRouter.put("/request/:id", (req, res) => {
  ModifyResponse(req, res);
});

// widgetRouter.post("/widget", createWidget);

// widgetRouter.post("/widget", (req, res) => {
//   createWidget(req, res);
// });

// widgetRouter.put("/widget/:id", (req, res) => {
//   updateWidget(req, res);
// });

responseRouter.post("/request", (req, res) => {
  createResponse(req, res);
});
responseRouter.post("/requestchild", (req, res) => {
  createResponseChild(req, res);
});

responseRouter.put("/request/:id", (req, res) => {
  updateResponse(req, res);
});

responseRouter.delete("/request/:id", (req, res) => {
  deleteResponse(req, res);
});

responseRouter.get("/request", (req, res) => {
  getRequestAndRelation(req, res);
});

export default responseRouter;
