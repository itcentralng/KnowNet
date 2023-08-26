import { config } from "dotenv";
config();

// Set your app credentials

// Initialize the SDK
import AfricasTalking from "africastalking";

const africastalking = AfricasTalking({
  apiKey: process.env.AT_Api_Key,
  username: "sandbox",
});

// Get the SMS service
const sms = africastalking.SMS;

// Fetch all messages using a recursive function
function getMessagesRecursively(lastReceivedId) {
  const checkForMoreMessages = (responses) => {
    let messages = responses.SMSMessageData.Messages;

    // No more messages to fetch
    if (messages.length === 0) return "Done";

    // There are more messages
    messages.forEach((message) => {
      console.log(message);
      // Reassign the lastReceivedId
      lastReceivedId = message.id;
    });
    return getMessagesRecursively(lastReceivedId);
  };

  return sms.fetchMessages({ lastReceivedId }).then(checkForMoreMessages);
}

// Our API will return 100 messages at a time back to you,
// starting with what you currently believe is the lastReceivedId.
// Specify 0 for the first time you access the method
// and the ID of the last message we sent you on subsequent calls
let lastReceivedId = 78615;

getMessagesRecursively(lastReceivedId).then(console.log).catch(console.log);
