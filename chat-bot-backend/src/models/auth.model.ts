import { Schema, model } from "mongoose";


export interface Auth {
  email: string,
  password: string,
  orgName: string,
  phoneNumber: Number,
  typeOfOrg: string,
  street1: string,
  street2: string,
  city: string,
  state: string,
  country: string,
  zipCode: Number
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
  orgName: {
    type: "String",
    required: true
  },
  phoneNumber: {
    type: "Number"
  },
  typeOfOrg: {
    type: "String",
    required: true
  },
  street1: {
    type: "String"
  },
  street2: {
    type: "String"
  },
  city: {
    type: "String",
    required: true
  },
  country: {
    type: "String",
    required: true
  },
  zipCode: {
    type: "Number",
    required: true
  }
});

export const AuthModel = model<Auth>("auth", authSchema);
