import { Router } from "express";
import { createWidget } from "../controllers/widget.controller";
import { widgetModel } from "../models/widget.model";

const widgetRouter = Router();

widgetRouter.get("/widget", async (req, res) => {
  // TODO logic for creating role
  let data = await widgetModel.find({});
  res.send({
    success: true,
    message: "Theme fetched successfully",
    data,
  });
});

// widgetRouter.post("/widget", createWidget);

widgetRouter.post("/widget", (req, res) => {
  createWidget(req, res);
});

export default widgetRouter;
