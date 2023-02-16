import { createWidget, updateWidget } from "../controllers/widget.controller";

import { ResponseModel } from "../models/response.model";
import { Router } from "express";
import { getRequest } from "../controllers/response.controller";

const responseRouter = Router();

responseRouter.get("/request/:id", (req, res) => {
  getRequest(req, res);
});

// widgetRouter.post("/widget", createWidget);

// widgetRouter.post("/widget", (req, res) => {
//   createWidget(req, res);
// });

// widgetRouter.put("/widget/:id", (req, res) => {
//   updateWidget(req, res);
// });
export default responseRouter;
