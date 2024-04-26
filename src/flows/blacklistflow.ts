import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

const timers: { [key: string]: NodeJS.Timeout } = {};

export const blackListFlow = addKeyword(EVENTS.ACTION).addAction(
  async (ctx, { flowDynamic, blacklist }) => {
    const number = ctx.from;
    const checked = blacklist.checkIf(number);

    if (!checked) {
      blacklist.add(ctx.from);
      await flowDynamic(`${ctx.from} added to blacklist`);

      // Iniciar temporizador para eliminar usuario de la blacklist después de 30 minutos
      startTimer(number, 1800000, blacklist); // 30 minutos en milisegundos
    } else {
      blacklist.remove(ctx.from);
      await flowDynamic(`${ctx.from} removed from blacklist`);
    }
  }
);

const startTimer = (number: string, ms: number, blacklist: any) => {
  timers[number] = setTimeout(() => {
    blacklist.remove(number);
    console.log(`User ${number} removed from blacklist`);
  }, ms);
};
