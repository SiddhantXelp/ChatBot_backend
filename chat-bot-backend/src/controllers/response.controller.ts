import { Request, Response, response } from "express";

import { ResponseModel } from "../models/response.model";
import { Theme } from "./../models/widget.model";

const getRequest = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = await ResponseModel.findOne({ _id: id });

  if (!response) {
    return res
      .status(404)
      .json({ message: `Request with id "${id}" not found.` });
  }

  return res.status(200).json({ data: response });
};

export { getRequest };
