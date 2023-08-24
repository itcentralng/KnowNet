import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import AfricasTalking from "africastalking";
import chatBot from "./AI.js";

configDotenv();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const africastalking = AfricasTalking({
  apiKey: process.env.AT_Api_Key,
  username: "sandbox",
});

async function sendSMS(response) {
  // TODO: Send message

  try {
    const result = await africastalking.SMS.send({
      to: "+2348159595959",
      message: `${response}`,
      from: "22881",
    });
  } catch (ex) {
    console.error(ex);
  }
}

function smsServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //   app.get("/", (req, res) => {
  //     res.send({ message: "hello world" });
  //   });
  // TODO: Incoming messages route
  app.post("/incoming-messages", async (req, res) => {
    console.log(req.body.text);
    try {
      let advert = `
      
      Ad:
      ________________________
      This is a sample ad.
      `;
      let reply = await chatBot(req.body.text + "\n");
      //   reply += advert;
      sendSMS(`${reply} \n  ${advert}`);
      res.end();
    } catch (error) {
      console.log(error);
      res.end();
    }
  });

  const port = process.env.PORT;
  app.listen(port, function () {
    console.log(`Web server listening on port ${port}`);
    // TODO: call sendSMS to send message after server starts
    // sendSMS();
  });
}

smsServer();
