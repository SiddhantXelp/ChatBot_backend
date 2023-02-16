import { Request, Response, response } from "express";
import { Widget, widgetModel } from "../models/widget.model";

import { Theme } from "./../models/widget.model";

const getWidget = async (req: Request, res: Response) => {
  const { id } = req.params;

  const widget = await widgetModel.findOne({ _id: id });

  if (!widget) {
    return res
      .status(404)
      .json({ message: `Request with id "${id}" not found.` });
  }

  return res.status(200).json({ data: widget });
};

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
  const used = await widgetModel.findOne({
    title,
    description,
    powered_by,
    language,
  });
  if (!used) {
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
  } else {
    res.status(404).json({ message: "already exists" });
  }
};

export { getWidget, createWidget, updateWidget };
