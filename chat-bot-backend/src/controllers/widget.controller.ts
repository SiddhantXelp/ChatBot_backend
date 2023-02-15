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

const updateWidget = async (req: Request, res: Response) => {
  const { title, description, powered_by, language, theme } = req.body;
  const id = req.params.id;
  //const usedTitle = await widgetModel.findOne(title);

  return widgetModel
    .findById(id)
    .then((widget) => {
      if (widget) {
        widget.set(req.body);

        return widget
          .save()
          .then((widget) => res.status(201).json({ widget }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export { createWidget, updateWidget };
