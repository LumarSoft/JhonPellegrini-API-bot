import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const flowGrua = addKeyword(EVENTS.ACTION)
  .addAnswer("Si necesita una grúa puede llamar al numero 08106660302.")
  .addAnswer("Recordatorio: La cobertura A no posee asistencia de grúa.")
  .addAnswer([
    "👉 *1* - Volver al menú cliente.",
    "👉 *0* - Finalizar conversación.",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowSiCliente);
        case "0":
          return endFlow("¡Nos vemos luego!");
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida."
          );
      }
    }
  );
