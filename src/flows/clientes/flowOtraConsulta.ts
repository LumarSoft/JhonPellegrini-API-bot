import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const FlowContinuar = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Perfecto. ¿Necesita realizar algo más?",
    "👉 *1* - Menú cliente.",
    "👉 *0* - ¡Nos vemos luego!",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      switch (response) {
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

export const flowOtraConsulta = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Deje escrita su consulta y nos comunicaremos con usted a la brevedad.",
    "*RECUERDE*: Nuestro horario de atencion es de *9* a *18*hs",
    "👉 *0* - Para cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, endFlow, fallBack }) => {
      const resp = ctx.body;
      if (resp === "0") {
        return gotoFlow(flowSiCliente);
      }
      if (resp.length > 6) {
        return gotoFlow(FlowContinuar);
      }
      return fallBack(
        "❌ Debe ingresar una consulta válida, por favor intente nuevamente."
      );
    }
  );
