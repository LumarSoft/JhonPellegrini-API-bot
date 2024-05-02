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
      flowDynamic("Gracias por comunicarte con nosotros.");
    }

    // Iniciar temporizador para eliminar usuario de la blacklist después de 30 minutos
    startTimer(number, 60000, blacklist);
  }
);

const startTimer = (number: string, ms: number, blacklist: any) => {
  setTimeout(() => {
    blacklist.remove(number);
    console.log(`User ${number} removed from blacklist`);
  }, ms);
};
