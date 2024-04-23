import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const flowPoliza = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo",
    "👉 0 - Para cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, endFlow, fallBack }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowDocumentacion);
      }
      if (response.length > 0) {
        return endFlow(
          "Gracias, en breve nos comunicaremos con usted para informarle sobre su póliza"
        );
      }
      return fallBack("❌ Debe ingresar un dni o patente válida");
    }
  );

export const flowCuponera = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo",
    "👉 0 - Para cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowDocumentacion);
      }
      if (response !== "0" && response.length > 0) {
        return endFlow(
          "Gracias, en breve nos comunicaremos con usted para informarle sobre su cuponera"
        );
      }
      return fallBack("❌ Debe ingresar un dni o patente válida");
    }
  );

export const flowDocumentacion = addKeyword(EVENTS.ACTION)
  .addAnswer("Que documentacion necesita?")
  .addAnswer([
    "👉 1 - Póliza",
    "👉 2 - Cuponera",
    "👉 3 - Volver al menu cliente",
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
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
