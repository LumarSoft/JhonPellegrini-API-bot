import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";
import { blackListFlow } from "../blacklistflow";

export const continuacionCotizacion = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Desea hacer algo mas?",
    "👉 *1* - Menu cotizacion",
    "👉 *2* - Menu cliente",
    "👉 *0* - Finalizar conversacion",
  ])
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const response = ctx.body;
    switch (response) {
      case "1":
        return gotoFlow(flowCotizacionCliente);
      case "2":
        return gotoFlow(flowSiCliente);
      case "0":
        return gotoFlow(blackListFlow);
      default:
        return fallBack(
          "❌ Opción no válida, por favor seleccione una opción válida"
        );
    }
  });

export const flowCotizarAutomotor = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Aquí se solicitarían los datos del automotor.",
    "👉 *0* - Cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, globalState, flowDynamic }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        globalState.update({ readyForBL: true });
        await flowDynamic(
          "Gracias, en breve nos comunicaremos con usted para terminar de cotizar su automotor. (cod#1400)"
        );
        return gotoFlow(continuacionCotizacion);
      }
      return fallBack("❌ Debe ingresar una información válida.");
    }
  );

export const flowCotizarHogar = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aquí se solicitarían los datos del hogar", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic, globalState }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        globalState.update({ readyForBL: true });
        await flowDynamic(
          "Gracias, en breve nos comunicaremos con usted para terminar de cotizar su hogar. (cod#1401)"
        );
        return gotoFlow(continuacionCotizacion);
      }
      return fallBack("❌ Debe ingresar una información válida.");
    }
  );

export const flowCotizarComercio = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Aquí se solicitarían los datos del comercio.",
    "👉 *0* - Cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, globalState, flowDynamic }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        globalState.update({ readyForBL: true });
        await flowDynamic(
          "Gracias, en breve nos comunicaremos con usted para terminar de cotizar su comercio. (cod#1402)"
        );
        return gotoFlow(continuacionCotizacion);
      }
      return fallBack("❌ Debe ingresar una información válida.");
    }
  );

export const flowCotizarAp = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aquí se solicitarían los datos del ap", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic, globalState }) => {
      const response = ctx.body;
      if (response === "0") {
        gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        globalState.update({ readyForBL: true });
        await flowDynamic(
          "Gracias, en breve nos comunicaremos con usted para terminar de cotizar su ap. (cod#1403)"
        );
        return gotoFlow(continuacionCotizacion);
      }
      return fallBack("❌ Debe ingresar una información válida.");
    }
  );

export const flowCotizarOtrosRiesgos = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aqui iría la cotización de otros riesgos", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, globalState, flowDynamic }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        globalState.update({ readyForBL: true });
        await flowDynamic(
          "Gracias, en breve nos comunicaremos con usted para terminar de cotizar otros riesgos. (cod#1404)"
        );
        return gotoFlow(continuacionCotizacion);
      }
      return fallBack("❌ Debe ingresar una información válida.");
    }
  );

export const flowCotizacionCliente = addKeyword(EVENTS.ACTION)
  .addAnswer("¿Qué desea cotizar?")
  .addAnswer([
    "👉 *1* - Automotor",
    "👉 *2* - Hogar",
    "👉 *3* - Comercio",
    "👉 *4* - Ap",
    "👉 *5* - Otros riesgos",
    "👉 *6* - Volver al menú cliente",
    "👉 *0* - Finalizar conversación",
  ])
  .addAction(
    {
      capture: true,
    },
    async (ctx, { gotoFlow, fallBack }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowCotizarAutomotor);
        case "2":
          return gotoFlow(flowCotizarHogar);
        case "3":
          return gotoFlow(flowCotizarComercio);
        case "4":
          return gotoFlow(flowCotizarAp);
        case "5":
          return gotoFlow(flowCotizarOtrosRiesgos);
        case "6":
          return gotoFlow(flowSiCliente);
        case "0":
          return gotoFlow(blackListFlow);
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
