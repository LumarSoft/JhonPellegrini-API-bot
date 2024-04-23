import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const flowCotizarAutomotor = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aqui se solicitaria los datos del automotor", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, endFlow, fallBack }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted para terminar de cotizar su automotor");
      }
      return fallBack("❌ Debe ingresar una informacion valida");
    }
  );

export const flowCotizarHogar = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aqui se solicitaria los datos del hogar", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, endFlow, fallBack }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted para terminar de cotizar su hogar");
      }
      return fallBack("❌ Debe ingresar una informacion valida");
    }
  );

export const flowCotizarComercio = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aqui se solicitaria los datos del comercio", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted para terminar de cotizar su comercio");
      }
      return fallBack("❌ Debe ingresar una informacion valida");
    }
  );

export const flowCotizarAp = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aqui se solicitaria los datos del ap", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      if (response === "0") {
        gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted para terminar de cotizar su ap");
      }
      return fallBack("❌ Debe ingresar una informacion valida");
    }
  );

export const flowCotizarOtrosRiesgos = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aqui iria la cotizacion de otros riesgos", "👉 *0* - Cancelar"])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowCotizacionCliente);
      }
      if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted para terminar de cotizar otros riesgos");
      }
      return fallBack("❌ Debe ingresar una informacion valida");
    }
  );

export const flowCotizacionCliente = addKeyword(EVENTS.ACTION)
  .addAnswer("Que desea cotizar?")
  .addAnswer([
    "👉 *1* - Automotor",
    "👉 *2* - Hogar",
    "👉 *3* - Comercio",
    "👉 *4* - Ap",
    "👉 *5* - Otros riesgos",
    "👉 *6* - volver al menu cliente",
  ])
  .addAction(
    {
      capture: true,
    },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
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
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
