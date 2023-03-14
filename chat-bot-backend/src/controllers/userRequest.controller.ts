import { Document, Schema, Types, model } from "mongoose";
import { RelationModel, RespRelation } from "../models/response.relation";
import { Request, Response, response } from "express";

import { ObjectId } from "mongoose";
import { RequestModel } from "../models/request.model";
import { Theme } from "./../models/widget.model";
import { UserRequestModel } from "./../models/userRequest.model";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const getUserRequest = async (req: Request, res: Response) => {
  //console.log("hello");
  const role = await UserRequestModel.find().populate("children");

  console.log(role);

  if (!role) {
    return res.status(404).json({ message: `Request with id "" not found.` });
  }

  return res.status(200).json({ data: role });
};

const getUserRequestById = async (req: Request, res: Response) => {
  // console.log("hello");
  const { id } = req.params;

  const role = await UserRequestModel.findOne({ uuid: id }).populate(
    "children"
  );

  const role2 = await RequestModel.findOne({ uuid: id }).populate("children");
  console.log(role);
  if (!role && !role2) {
    return res.status(404).json({ message: `Request with id "" not found.` });
  } else if (role) {
    return res.status(200).json({ data: role });
  } else if (role2) {
    return res.status(200).json({ data: role2 });
  }
};

const createUserRequest = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  //const id = req.params;
  var newId = uuidv4();
  const userrequest = await UserRequestModel.findOne({
    uuid: uuid,
  });
  const request: any = await RequestModel.findOne({
    uuid: uuid,
  });
  const { title, tags, description, type, delay } = req.body;
  if (!userrequest && !request) {
    const UserRequest = new UserRequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: tags,
      description: description,
      title: title,
      type: type,
      delay: delay,
      uuid: uuid,
    });
    console.log(UserRequest);
    UserRequest.save(function (err) {
      if (err) return handleError(err);
      const responsee = new RequestModel({
        _id: new mongoose.Types.ObjectId(),
        tags: tags,
        description: description,
        title: title,
        type: type,
        delay: delay,
        uuid: newId,
      });
      responsee.save(function (err) {
        if (err) return handleError(err);
      });
      //console.log(responsee);
      // UserRequest.children.push(responsee);
      // console.log(UserRequest);
      // UserRequest.save();
      res.status(201).json({ data: UserRequest });
    });
  } else if (userrequest && !request) {
    const responsee = new RequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: tags,
      description: description,
      title: title,
      type: type,
      delay: delay,
      uuid: newId,
    });
    responsee.save(function (err) {
      if (err) return handleError(err);
    });
    userrequest.children.push(responsee._id);
    console.log(request);
    userrequest.save();
    res.status(201).json({ data: responsee });
  } else if (request && !userrequest) {
    const UserRequest = new UserRequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: request.tags,
      description: request.description,
      title: request.title,
      type: request.type,
      delay: request.delay,
      uuid: request.uuid,
    });
    console.log(UserRequest);
    UserRequest.save(function (err) {
      if (err) return handleError(err);
      const responsee = new RequestModel({
        _id: new mongoose.Types.ObjectId(),
        tags: tags,
        description: description,
        title: title,
        type: type,
        delay: delay,
        uuid: newId,
      });
      responsee.save(function (err) {
        if (err) return handleError(err);
      });
      //console.log(responsee);
      UserRequest.children.push(responsee._id);
      // console.log(UserRequest);
      UserRequest.save();
      res.status(201).json({ data: UserRequest });
    });
    // UserRequest.requests.push(responsee);
    // UserRequest.save();
  } else if (request && userrequest) {
    const responsee = new RequestModel({
      _id: new mongoose.Types.ObjectId(),
      tags: tags,
      description: description,
      title: title,
      type: type,
      delay: delay,
      uuid: newId,
    });
    responsee.save(function (err) {
      if (err) return handleError(err);
    });
    userrequest.children.push(responsee._id);
    console.log(request);
    userrequest.save();
    res.status(201).json({ data: responsee });
  }

  function handleError(err: NativeError): void {
    throw new Error("Function not implemented.");
  }
};
const updateUserRequest = async (req: Request, res: Response) => {
  const { title, tags, description, type, delay, uuid } = req.body;
  const { id } = req.params;
  const used = await UserRequestModel.findOne({ uuid: id });
  console.log(used);
  //     title,
  //     description,
  //     tags,
  //     type,
  //     delay,
  //     uuid,
  //   });
  const used1 = await RequestModel.findOne({ uuid: id }); 
  console.log("used1", used1)
  
  //     title,
  //     description,
  //     tags,
  //     type,
  //     delay,
  //     uuid
  //   if (used && used1) {

  //   }
  if (used && used1) {
    console.log("helllo");
    const a = UserRequestModel.findOne({ uuid: id })
      .then((user) => {
        if (user) {
          user.set(req.body);

          return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error) => res.status(500).json({ error }));
        } else {
          return res.status(404).json({ message: "not found for userRequest" });
        }
      })
      .catch((error) => res.status(500).json({ error: "user" }));
    const b = RequestModel.findOne({ uuid: id })
      .then((request) => {
        if (request) {
          request.set(req.body);

          return request
            .save()
            .then((request) => res.status(201).json({ request }))
            .catch((error) => res.status(500).json({ error }));
        } else {
          return res.status(404).json({ message: "not found for request" });
        }
      })
      .catch((error) => res.status(500).json({ error: "child" }));
    return { a, b };
  } else if (used) {
    console.log("helllo11");
    return UserRequestModel.findOne({ uuid: id })
      .then((request) => {
        if (request) {
          request.set(req.body);

          return request
            .save()
            .then((request) => res.status(201).json({ request }))
            .catch((error) => res.status(500).json({ error }));
        } else {
          return res.status(404).json({ message: "not found for request" });
        }
      })
      .catch((error) => res.status(500).json({ error: "child" }));
  } else if (used1) {
    return RequestModel.findOne({ uuid: id })
      .then((request) => {
        if (request) {
          request.set(req.body);

          return request
            .save()
            .then((request) => res.status(201).json({ request }))
            .catch((error) => res.status(500).json({ error }));
        } else {
          return res.status(404).json({ message: "not found for request" });
        }
      })
      .catch((error) => res.status(500).json({ error: "child" }));
  }
  if (!used && !used1) {
    res.status(404).json({ message: "already exists" });
  }
};

// const updateRequest = async (req: Request, res: Response) => {
//   const { title, tags, description, type, delay, uuid } = req.body;
//   const id = req.params;
//   //console.log(id);
//   const used = await RequestModel.findOne({
//     title,
//     description,
//     tags,
//     type,
//     delay,
//   });
//   //
//   console.log(used);
//   if (!used) {
//     return RequestModel.findOne({ uuid: id })
//       .then((request) => {
//         if (request) {
//           request.set(req.body);

//           return request
//             .save()
//             .then((request) => res.status(201).json({ request }))
//             .catch((error) => res.status(500).json({ error }));
//         } else {
//           return res.status(404).json({ message: "not found" });
//         }
//       })
//       .catch((error) => res.status(500).json({ error }));
//   } else {
//     res.status(404).json({ message: "already exists" });
//   }
// };
export {
  createUserRequest,
  getUserRequest,
  getUserRequestById,
  updateUserRequest,
};
function handleError(err: NativeError): void {
  throw new Error("Function not implemented.");
}
