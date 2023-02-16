import {
  createWidget,
  getWidget,
  updateWidget,
} from "../controllers/widget.controller";

import { Router } from "express";
import { widgetModel } from "../models/widget.model";

const widgetRouter = Router();

widgetRouter.get("/widget/:id", (req, res) => {
  getWidget(req, res);
});

// widgetRouter.post("/widget", createWidget);

widgetRouter.post("/widget", (req, res) => {
  createWidget(req, res);
});

widgetRouter.put("/widget/:id", (req, res) => {
  updateWidget(req, res);
});
export default widgetRouter;
