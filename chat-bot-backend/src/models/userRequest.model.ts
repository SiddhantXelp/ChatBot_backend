import { Document, Schema, Types, model } from "mongoose";

import { Response } from "express";

const mongoose = require("mongoose");

export interface UserRequest {
  title: string;
  tags: Array<any>;
  description: string;
  type:string;
  children: Array<any>;
  isDeleted?: boolean;
  delay:String;
  uuid: String
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
  children: [{ type: Schema.Types.ObjectId, ref: "requests" }],
};

const responseSchema = new Schema<UserRequest>(relationSchema);

export const UserRequestModel = model<UserRequest>(
  "userrequests",
  relationSchema
);
