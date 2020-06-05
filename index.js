const cron = require("node-cron");
const { getItems } = require("./firebase");
const { triggerEmailAlert } = require("./mailer");

const checkDate = () => {
  getItems().then((result) => {
    result.forEach((item) => {
      const createDate = item.date.toDate();
      const nowDate = new Date();
      const differenceInMilli = Math.abs(nowDate - createDate);
      const differenceInDays = Math.floor(
        differenceInMilli / (3600 * 1000 * 24)
      );
      if (differenceInDays >= 2) {
        console.log(
          `Id: ${item.id} Name: ${item.itemName} needs to be notified.`
        );
        triggerEmailAlert(item.id, item.itemName);
      }
    });

    console.log(
      "Waiting another 8 hours to run the cron job again at " +
        new Date().toISOString()
    );
  });
};

console.log("Initial running cron job at " + new Date().toISOString());
checkDate();

cron.schedule("*/8 * * * *", () => {
  console.log("Running cron job every 8 hours at " + new Date().toISOString());
});
