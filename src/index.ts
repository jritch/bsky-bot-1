import Bot from "./lib/bot.js";
import getPostText from "./lib/getPostText.js";

const text = await Bot.run(getPostText, { dryRun: false });

if (text !== null) {
  console.log(`[${new Date().toISOString()}] Posted: "${text}"`);
}
else {
  console.log (`It's five o'clock nowhere`);
}
