const cron = require("node-cron");
const { getItems } = require("./firebaseInit");
const { triggerEmailAlert } = require("./mailer");

const checkDate = async () => {
  const result = await getItems();
  result.forEach(async (item) => {
    console.log(".");
    const createDate = item.date.toDate();
    const nowDate = new Date();
    const differenceInMilli = Math.abs(nowDate - createDate);
    const differenceInDays = Math.floor(differenceInMilli / (3600 * 1000 * 24));
    if (differenceInDays >= 2 && !item.testStatus) {
      console.log(
        `Id: ${item.id} Name: ${item.itemName} needs to be notified.`
      );
      await triggerEmailAlert(item.id, item.itemName, differenceInDays);
    }
  });
  return;
};

console.log("Initial running cron job at " + new Date().toISOString());
checkDate();

cron.schedule("*/8 * * * * *", () => {
  console.log("Running cron job every 8 hours at " + new Date().toISOString());
  checkDate();
});
