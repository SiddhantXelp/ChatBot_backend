import { Document, Schema, model } from "mongoose";

import { Response } from "express";

const mongoose = require("mongoose");


export interface Option {
  opId: string;
}
export interface RespRelation {
    parentuuid: any,
    uuid: string,
    content: Array<any>
  
}


const relationSchema: any = {
   
  parentuuid:{
    type: "String",
    ref: "responses"
  },
 content: [{
        id: "String"
}]
}


const responseSchema = new Schema<RespRelation>(relationSchema);

export const RelationModel = model<RespRelation>("resrelations", relationSchema);

