import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { welcomeFlow } from "./test";
import option2 from "./option2";

const option1 = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Select an option:\n\n*SubMenu 1*\n",
    "1 Go back",
    "2 Go to SubMenu2",
    "3 End",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, endFlow, fallBack }) => {
      const resp = ctx.body;
      if (resp === "1") {
        return gotoFlow(welcomeFlow);
      } else if (resp === "2") {
        return gotoFlow(option2);
      } else if (resp === "3") {
        return endFlow("End");
      } else {
        return fallBack(`Option ${resp} is not valid, try it again.`);
      }
    }
  );

export default option1;
