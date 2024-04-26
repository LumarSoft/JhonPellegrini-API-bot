import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowConsulta } from "./flowBienvenida";
import { blackListFlow } from "./blacklistflow";

export const flowCotizacionNoCliente = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Por favor, deje sus datos (localidad y descripción del bien).",
    "👉 *0* - Cancelar.",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, globalState, flowDynamic }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowNoCliente);
      }
      if (response.length > 5) {
        globalState.update({ readyForBL: true });
        await flowDynamic(
          "Datos de cotizacion procesados. En breve nos comunicaremos con usted, Gracias! (cod#1100)"
        );
        return gotoFlow(blackListFlow);
      }
      return fallBack("❌ Debe ingresar una localidad y descripción del bien.");
    }
  );

export const flowNoCliente = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "¡Nos alegra que este interesado en nosotros!",
    "*RECORDATORIO*: Nuestros horarios de atencion son de 8 a 16hs",
  ])
  .addAnswer([
    "¿Que desea hacer?",
    "👉 *1* - Solicitar cotización.",
    "👉 *2* - Volver al menú principal.",
    "👉 *0* - Finalizar conversación.",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowCotizacionNoCliente);
        case "2":
          return gotoFlow(flowConsulta);
        case "0":
          return endFlow("¡Nos vemos luego!");
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida."
          );
      }
    }
  );
