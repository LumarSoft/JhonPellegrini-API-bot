import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowBienvenida } from "./flowBienvenida";

const flowCotizacionNoCliente = addKeyword(EVENTS.ACTION).addAnswer(
  "Por favor deje sus datos (localidad y descripcion del bien), en breve nos comunicaremos con usted"
);

export const flowNoCliente = addKeyword(EVENTS.ACTION)
  .addAnswer("Nos alegra que este interesado en nosotros")
  .addAnswer([
    "Que desea hacer?",
    "👉 1 - Solicitar cotizacion",
    "👉 0 - Volver al menu principal",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowCotizacionNoCliente);
        case "0":
          return gotoFlow(flowBienvenida);
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
