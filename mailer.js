const nodemailer = require("nodemailer");
const { v4 } = require("uuid");
const { SEND_EMAIL: sendEmail, EMAIL: email, PASS: password } = process.env;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: sendEmail,
    pass: password,
  },
});

const triggerEmailAlert = async (id, itemName, days) => {
  console.log(".");
  console.log(
    "Triggering email to " + email + " at " + new Date().toISOString()
  );
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: sendEmail,
        to: email,
        subject: `[CIMA_ALERT] - Item ${id} needs update`,
        html:
          `<section id="${v4()}" style="padding:20px;"><p style="padding:20px;background-color:white">` +
          `Item ID: ${id}<br/>Item Name: ${itemName}<br/>This item has not been updated for ${days} days<br/>Please help update the status.` +
          `<br/><br/><small>Email is triggered at ${new Date().toLocaleString()}</small></p><section>`,
      },
      (error, info) => {
        console.log(".");
        if (error) {
          console.log(error);
          reject(error);
        }
        console.log(
          "Message sent: %s",
          info.messageId + " at " + new Date().toISOString()
        );
        resolve(info);
      }
    );
  });
};

module.exports = {
  triggerEmailAlert,
};
