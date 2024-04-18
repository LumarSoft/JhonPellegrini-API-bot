import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowNoCliente } from "./flowNoCliente";
import { flowSiCliente } from "./flowCliente";

export const flowBienvenida = addKeyword("Hola")
  .addAnswer("Hola, te comunicaste con JPMG")
  .addAnswer(
    [
      "Para continuar necesitamos saber si ya sos cliente?",
      "👉 1 - Si",
      "👉 2 - No",
    ],
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option: string = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowSiCliente);
        case "2":
          return gotoFlow(flowNoCliente);
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
