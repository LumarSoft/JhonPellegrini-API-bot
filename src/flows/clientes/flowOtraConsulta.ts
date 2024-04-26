import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";
import { blackListFlow } from "../blacklistflow";

export const FlowContinuar = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Perfecto. Necesita realizar algo mas?",
    "👉 *1* - Menu cliente",
    "👉 *0* - Hasta luego!",
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const response = ctx.body;
    switch (response) {
      case "1":
        return gotoFlow(flowSiCliente);
      case "0":
        return gotoFlow(blackListFlow);
      default:
        return fallBack(
          "❌ Opción no válida, por favor seleccione una opción válida"
        );
    }
  });

export const flowOtraConsulta = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Deje escrita su consulta y nos comunicaremos con usted a la brevedad.",
    "*RECUERDE*: Horario de atencion de 9 a 18hs",
    "👉 *0* - Para cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, globalState, flowDynamic }) => {
      const resp = ctx.body;
      if (resp === "0") {
        return gotoFlow(flowSiCliente);
      }
      if (resp.length > 6) {
        globalState.update({ readyForBL: true });
        await flowDynamic(
          "Perfecto, responderemos tu consulta cuanto antes (cod#1500)"
        );
        return gotoFlow(FlowContinuar);
      }
      return fallBack(
        "❌ Debe ingresar una consulta válida, por favor intente nuevamente"
      );
    }
  );
