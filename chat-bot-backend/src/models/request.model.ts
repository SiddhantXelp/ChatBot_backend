import { Document, Schema, Types, model } from "mongoose";

import { Response } from "express";

const mongoose = require("mongoose");

export interface Request {
  title: string;
  tags: Array<any>;
  description: string;
  type: string;
  isDeleted?: boolean;
  delay:String,
  uuid:String
  children:Array<any>;
}

const relationSchema: any = {
  title: {
    uuid: {
      type: "String",
    },
    type: "String",
  },
  tags: [
    {
      type: "String",
    },
  ],
  description: {
    type: "String",
  },
  type: {
    type: "String",
  },
  isDeleted: {
    type: "Boolean",
    default: "false",
  },
  delay: {
    type:"String"
  },
  uuid: {
    type:"String"
  },
  children: [{ type: Schema.Types.ObjectId, ref: "userrequests" }],
};

const responseSchema = new Schema<Request>(relationSchema);

export const RequestModel = model<Request>("requests", relationSchema);
