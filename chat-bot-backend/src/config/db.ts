import mongoose, { connect } from "mongoose";

function connects() {
  return connect(
    "mongodb+srv://siddhantkumar92:Kumar92@chatbot.rsn86zi.mongodb.net/chat_db?retryWrites=true&w=majority"
  )
    .then(() => {
      console.log("db connected");
    })
    .catch((error: any) => {
      console.log(error);
    });
}
export default connects;

// DB=mongodb+srv://siddhantkumar92:Kumar92@chatbot.rsn86zi.mongodb.net/ChatBot?retryWrites=true&w=majority
