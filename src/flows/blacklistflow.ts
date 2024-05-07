import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

export const blackListFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { blacklist, globalState, flowDynamic }) => {
    const number = ctx.from;
    const deservesBL = globalState.get("readyForBL");

    if (deservesBL) {
      blacklist.add(ctx.from);
      console.log(`${ctx.from} added to blacklist`);
      await flowDynamic(
        "Gracias por comunicarte con nosotros. A la brevedad contestaremos tu consulta."
      );
    } else {
      await flowDynamic("Gracias por comunicarte con nosotros.");
    }


    startTimer(number, 10000, blacklist);
  }
);

const startTimer = (number: string, ms: number, blacklist: any) => {
  setTimeout(() => {
    blacklist.remove(number);
    console.log(`User ${number} removed from blacklist`);
  }, ms);
};
