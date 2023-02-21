import { Schema, model } from "mongoose";


export interface Auth {
  email: string,
  password: string,
  firstName: string,
  lastName:string
}

const authSchema = new Schema<Auth>({
  email: {
    type: "String",
    required: true
  },
  password: {
    type: "String",
    required: true
  },
  firstName: {
    type:"String"
  },
  lastName:{
    type:"String"
  }
});

export const AuthModel = model<Auth>("auth", authSchema);
