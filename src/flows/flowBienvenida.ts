import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowNoCliente } from "./flowNoCliente";
import { flowSiCliente } from "./flowCliente";

export const flowConsulta = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Hola! Te comunicaste JPMG.",
    "Necesitamos saber si sos cliente",
    "👉 1 - Si",
    "👉 2 - No",
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow }) => {
    const message = ctx.body;
    if (message === "1") {
      return gotoFlow(flowSiCliente);
    } else if (message === "2") {
      return gotoFlow(flowNoCliente);
    }
  });

export const flowBienvenida = addKeyword(EVENTS.WELCOME).addAction(
  async (ctx, { gotoFlow }) => {
    const message = ctx.body;
    if (message.toLowerCase() === "hola") {
      return gotoFlow(flowConsulta);
    }
    return;
  }
);
