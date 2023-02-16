import { Document, Schema, model } from "mongoose";

import { Response } from "express";

// export interface ResponseDocument extends Response {
//   id: string;
//   title: string;
//   description: string;
//   powered_by: string;
//   language: string;
//   theme: Theme;
// }

export interface Option {
  opId: string;
}
export interface Resp {
  uuid: string;
  greeting: string;
  option: Option;
  content: string;
  feedback: string;
}

const responseSchema = new Schema<Resp>({
  uuid: {
    type: "String",
  },
  greeting: {
    type: "String",
  },
  option: {
    opId: "String",
  },
  content: {
    type: "String",
  },
  feedback: {
    type: "String",
  },
});

export const ResponseModel = model<Resp>("responses", responseSchema);
