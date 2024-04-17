import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

const flowCotizarAutomor = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria la cotizacion de automotor",
]);

const flowCotizarHogar = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria la cotizacion de hogar",
]);

const flowCotizarComercio = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria la cotizacion de comercio",
]);

const flowCotizarAp = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria la cotizacion de ap",
]);

const flowCotizarOtrosRiesgos = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria la cotizacion de otros riesgos",
]);

export const flowCotizacionCliente = addKeyword(EVENTS.ACTION)
  .addAnswer("Que desea cotizar?")
  .addAnswer([
    "👉 1 - Automotor",
    "👉 2 - Hogar",
    "👉 3 - Comercio",
    "👉 4 - Ap",
    "👉 5 - Otros riesgos",
    "👉 6 - volver al menu cliente",
  ])
  .addAction(
    {
      capture: true,
    },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowCotizarAutomor);
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
