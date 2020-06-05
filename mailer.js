const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "portoka.live@gmail.com",
    pass: "Yevn140295",
  },
});

const email = "amandaayechanmoe@gmail.com";

const triggerEmailAlert = (id, itemName) => {
  console.log(
    "Triggering email to " + email + " at " + new Date().toISOString()
  );
  transporter.sendMail(
    {
      from: "portoka.live@gmail.com",
      to: "amandaayechanmoe@gmail.com",
      subject: `Penta Ocean : [ALERT] Item ${id} needs update`,
      html:
        `<section style="padding:20px;background-color:deepskyblue"><p style="padding:20px;background-color:white">` +
        `Item ID: ${id}<br/>Item Name: ${itemName}<br/>This item has not been updated for 2 days or more<br/>Please help update the status.` +
        `<br/><br/><small>Email is triggered at ${new Date().toLocaleString()}</small></p><section>`,
    },
    (error, info) => {
      if (error) {
      }
      console.log(
        "Message sent: %s",
        info.messageId + " at " + new Date().toISOString()
      );
    }
  );
};

module.exports = {
  triggerEmailAlert,
};
