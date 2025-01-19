import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();


  export const mailtrapClient = new MailtrapClient({
 endpoint: process.env.MAILTRAP_ENDPOINT,
 token:process.env.MAILTRAP_TOKEN

});

 export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

// const recipient = [
//     {
//         email: "workwithneeraj.01@gmail.com",  // Corrected spelling here
//     }
// ];

// mailtrapClient.send({
//     from: sender,
//     to: recipient,
//     subject: "You are awesome",
//     text: "Congrats for sending an email with Mailtrap and this is the second mail of this time ",
//     category: "integration test"
// })
// .then(console.log)
// .catch(console.error); // Using .catch for handling errors
