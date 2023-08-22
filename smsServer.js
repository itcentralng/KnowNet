import express from "express";
import AfricasTalking from "africastalking";
import { config } from "dotenv";

config();

const app = express();

const africastalking = AfricasTalking({
  apiKey: process.env.AT_Api_Key,
  username: "sandbox",
});

async function sendSMS() {
  // TODO: Send message

  try {
    const result = await africastalking.SMS.send({
      to: "+2348159595959",
      message: "Sup bro",
      from: "22881",
    });
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
}

function smsServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.send({ message: "hello world" });
  });
  // TODO: Incoming messages route
  app.post("https://b94c-160-152-15-235.ngrok-free.app", (req, res) => {
    const data = req.body;
    console.log(`Received message: \n ${data}`);
    res.sendStatus(200);
  });

  // TODO: Delivery reports route
  app.post("/delivery-reports", (req, res) => {
    const data = req.body;
    console.log(`Received report: \n ${data}`);
    res.sendStatus(200);
  });

  const port = 3000;

  app.listen(port, () => {
    console.log(`App running on port: ${port}`);

    // TODO: call sendSMS to send message after server starts
    sendSMS();
  });
}

smsServer();
