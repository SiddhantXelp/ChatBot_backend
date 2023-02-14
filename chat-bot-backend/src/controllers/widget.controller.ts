import { Request, Response, response } from "express";
import { Widget, widgetModel } from "../models/widget.model";

import { Theme } from "./../models/widget.model";

const createWidget = async (req: Request, res: Response) => {
  const { title, description, powered_by, language, theme } = req.body;

  console.log("Req.Body", req.body);

  const widgetInput: Widget = {
    title,
    description,
    powered_by,
    language,
    theme,
  };

  try {
    const widgetCreated = await widgetModel.create(widgetInput);
    res.status(201).json({ data: widgetCreated });
  } catch (error) {
    res.status(501).json({ error });
  }
};

export { createWidget };
