import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import option1 from "./option1";
import option2 from "./option2";

export const welcomeFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer(`🙌 Example gotoFlow\nSelect an option:`)
  .addAnswer(
    ["M̲e̲n̲u̲\n", "Option 1 - Date ", "Option 2 - Time ", "Option 3 - End"],
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option: string = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(option1);
        case "2":
          return gotoFlow(option2);
        case "3":
          return endFlow("Bot ended.");
        default:
          return fallBack(`❌ Option ${option} is not valid! ❌`);
      }
    }
  );
