import { Request, Response, response } from "express";

import { Resp, ResponseModel } from "../models/response.model";
import { RelationModel,RespRelation } from "../models/response.relation";
import { ObjectId } from "mongoose";
import { Theme } from "./../models/widget.model";

const getRequest = async (req: Request, res: Response) => {
  // const { id } = req.params;

  const role = await ResponseModel.find()

  if (!role) {
    return res
      .status(404)
      .json({ message: `Request with id "" not found.` });
  }

  return res.status(200).json({ data: role });
};


const getRequestById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const role = await ResponseModel.findOne({_id:id})

  if (!role) {
    return res
      .status(404)
      .json({ message: `Request with id "" not found.` });
  }

  return res.status(200).json({ data: role });
};



const createResponse = async (req: Request, res: Response) => {
  // ResponseModel.aggregate([
  //   {
  //     $lookup:
  //     {
  //       from: "resrelations",
  //       as: "resrelations",
  //       let: { parentuuid: "$_id" },
  //       pipeline: [
  //         { $match: { $expr: { $eq: ['$parentuuid', '$$'] } } },
  //         {
  //           $project: {
  //             _id: 1,
  //             title: 1,
  //             tags: 1
  //           }
  //         }

  //       ]

  //     }
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       title: 1,
  //       tags: 1
  //     }
  //   }
  // ]).exec((err, result) => {
  //   if (err) {
  //     res.send(err)
  //   }
  //   if (result) {
  //     res.send({
  //       error: false,
  //       data: result
  //     })
  //   }
  // })

  const { uuid, title, tags, parent_id } = req.body;

  const responseInput: Resp = {
    uuid,
    tags,
    title
  };
  console.log(req.body)

  try {
    const generateResponse = await ResponseModel.create(responseInput);
    
    //Look-up for the parentId in Relation model.
    let relationRes
    const relations = await RelationModel.findOne({
      parentuuid : parent_id
    })
    console.log("Relations", relations);
    

    if(relations) {
      //Update the relations
      const child_id = generateResponse.uuid
      relations.content.push({
        id: child_id
      })
      relationRes = await relations.save()
     
    } else {
      relationRes = RelationModel.create({
        parentuuid: parent_id,
        content: [{id: generateResponse.uuid}]
      })
    }

    res.status(200).send({
      data: {...generateResponse, ...relationRes},
      
    })

  }
  catch (error) {
    res.status(400).json({ error })
  }
}

const createResponseChild = async (req:Request,res:Response)=>{
  const { uuid, parentuuid,content } = req.body;

  const responseInput: RespRelation = {
    uuid,
    parentuuid,
    content
  };

  try {
    const generateResponse = await RelationModel.create(responseInput);
    res.status(201).json({ data: generateResponse });

  }
  catch (error) {
    res.status(400).json({ error })
  }
}


const ModifyResponse = async (req: Request, res: Response) => {

  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await ResponseModel.findByIdAndUpdate(
        id, updatedData, options
    )

    res.send(result)
}
catch (error) {
    res.status(400).send(error)
}

  // const {uuid, title,tags} = req.body;
  // const id = req.params.id;

  // const used = await RelationModel.findOne({
    
  //   uuid, title,tags
    
  // });

  // console.log(used)
  // if (!used) {
  //   return RelationModel
  //     .findById(id)
  //     .then((response) => {
  //       if (response) {
  //         response.set(req.body);

  //         return response
  //           .save()
  //           .then((response) => res.status(201).json({ response }))
  //           .catch((error) => res.status(500).json({ error }));
  //       } else {
  //         return res.status(404).json({ message: "not found" });
  //       }
  //     })
  //     .catch((error) => res.status(500).json({ error }));
  // }
}


const updateResponse = async (req: Request, res: Response) => {
  const { greeting, option, content, feedback } = req.body;
  const id = req.params.id;
  const role = await ResponseModel.findOne({ _id: id });

  if (!role) {
    return res.status(404).json({ message: `This id "${id}" not found.` });
  }

  await ResponseModel.updateOne({ _id: id }, { greeting, option, content, feedback })
  const responseUpdated = await ResponseModel.findById(id, { greeting, option, content, feedback })
  return res.status(200).json({ data: responseUpdated })

}


const deleteResponse = async (req: Request, res: Response) => {
  const { greeting, option, content, feedback, isDeleted } = req.body;
  const id = req.params.id;
  try {
    const softdeleted = await ResponseModel.findByIdAndUpdate({ _id: id }, {
      $set: {
        isDeleted: true
      }

    });


    res.status(200).json({ message: "response deleted" })
  }
  catch (error) {
    res.status(500).json(error)
  }

  // try{

  //   await ResponseModel.findByIdAndUpdate(id, { isdeleted: true });
  //   res.status(200).json({message:"response deleted"})
  // }
  // catch(error){
  //   res.status(500).json(error)
  // }
}


export { getRequest, createResponse, updateResponse, deleteResponse,createResponseChild,getRequestById,ModifyResponse };
