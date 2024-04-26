import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";
import { blackListFlow } from "../blacklistflow";

export const flowConfirmacionPoliza = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Gracias, a la brevedad nos comunicaremos para informarle el estado de su documentacion. (cod#1201)",
    "Necesita algo mas?",
    "👉 *1* - Solicitar otra documentacion",
    "👉 *2* - Menu cliente",
    "👉 *0* - No, finalizar conversacion",
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const response = ctx.body;
    switch (response) {
      case "1":
        return gotoFlow(flowDocumentacion);
      case "2":
        return gotoFlow(flowSiCliente);
      case "0":
        return gotoFlow(blackListFlow);
      default:
        return fallBack("❌ Opción no válida");
    }
  });

export const flowConfirmacionCuponera = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Gracias, a la brevedad nos comunicaremos para informarle el estado de su cuponera. (cod#1201)",
    "Necesita algo mas?",
    "👉 *1* - Solicitar otra documentacion",
    "👉 *2* - Menu cliente",
    "👉 *0* - No, finalizar conversacion",
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const response = ctx.body;
    switch (response) {
      case "1":
        return gotoFlow(flowDocumentacion);
      case "2":
        return gotoFlow(flowSiCliente);
      case "0":
        return gotoFlow(blackListFlow);
      default:
        return fallBack("❌ Opción no válida");
    }
  });

export const flowPoliza = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo",
    "👉 *0* - Para cancelar",
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const response = ctx.body;
    if (response === "0") {
      return gotoFlow(flowDocumentacion);
    }
    if (response.length > 3) {
      return gotoFlow(flowConfirmacionPoliza);
    }
    return fallBack("❌ Debe ingresar un dni o patente válida");
  });

export const flowCuponera = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo",
    "👉 *0* - Para cancelar",
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const response = ctx.body;
    if (response === "0") {
      return gotoFlow(flowDocumentacion);
    }
    if (response.length > 3) {
      return gotoFlow(flowConfirmacionCuponera);
    }
    return fallBack("❌ Debe ingresar un dni o patente válida");
  });

export const flowDocumentacion = addKeyword(EVENTS.ACTION)
  .addAnswer("Que documentacion necesita?")
  .addAnswer([
    "👉 *1* - Póliza",
    "👉 *2* - Cuponera",
    "👉 *3* - Volver al menu cliente",
    "👉 *0* - Finalizar conversacion",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowPoliza);
        case "2":
          return gotoFlow(flowCuponera);
        case "3":
          return gotoFlow(flowSiCliente);
        case "0":
          return endFlow("Nos vemos luego");
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
