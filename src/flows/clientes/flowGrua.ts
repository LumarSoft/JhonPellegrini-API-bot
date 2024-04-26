import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const flowGrua = addKeyword(EVENTS.ACTION)
  .addAnswer("Si necesita una grua puede llamar al numero 08106660302.")
  .addAnswer("Recordatorio: La cobertura A no posee asistencia de grua")
  .addAnswer([
    "👉 *1* - Volver al menu cliente",
    "👉 *0* - Finalizar conversacion",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowSiCliente);
        case "0":
          return endFlow("Nos vemos!");
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
