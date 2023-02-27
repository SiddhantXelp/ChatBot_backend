import { Document, Schema, model } from "mongoose";

import { Response } from "express";



export interface Option {
  opId: string;
}
export interface Resp {
  uuid?: string;
  title: string;
  tags: Array<any>;
  isDeleted?: boolean
}


const parentSchema: any = {
  uuid: {
    type: "String",
  },
  title: {
    uuid: {
      type: "String",
    },
    type: "String",
  },
  tags: [{
    // uuid: {
    //   type: "string"
    // },
    type: "String",
  }],
  isDeleted: {
    type: "Boolean",
    default: "false"
  },

}




const responseSchema = new Schema<Resp>(parentSchema);

export const ResponseModel = model<Resp>("responses", responseSchema);


// var ancestorpath = db.categoriesAAO.findOne({_id:'Greetings'}).ancestors;
// ancestorpath.push('Greetings')
// db.categoriesAAO.insert({_id:'LG', parent:'Greetings',ancestors:ancestorpath});
//{ "_id" : "LG", "parent" : "Greetings", "ancestors" : [ "Greetings" ] }


// var existingelemscount = db.categoriesPCO.find({parent:'Electronics'}).count();

// db.categoriesPCO.insert({_id:'LG', parent:'Electronics', someadditionalattr:'test'})
//{ "_id" : "LG", "parent" : "Electronics", "someadditionalattr" : "test", "order" : 40 }


// var ancestorpath = db.categoriesMP.findOne({_id:'Greets'}).path;
// ancestorpath += 'Greets,'
// db.categoriesMP.insert({_id:'LG', path:ancestorpath});
//{ "_id" : "LG", "path" : "Greets," }