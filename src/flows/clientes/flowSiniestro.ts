import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

const flowContinuacionSiniestro = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Necesita realizar algo mas?",
    "👉 *1* - Otra consulta",
    "👉 *2* - Menu cliente",
    "👉 *0* - Finalizar conversacion",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      switch (response) {
        case "1":
          return gotoFlow(flowSiniestro);
        case "2":
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

export const flowDenunciaSiniestro = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "A continuacion deje la siguiente informacion",
    "DNI del involucrado, Numero de poliza, Fecha del siniestro, Lugar del siniestro, Descripcion del siniestro",
    "👉 *0* - Cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      if (response === "0") {
        gotoFlow(flowSiniestro);
      }
      if (response.length > 0) {
        return endFlow(
          "Gracias, en breve nos comunicaremos con usted para la denuncia de su siniestro (cod#1300)"
        );
      }
      return fallBack("❌ Debe ingresar una informacion valida");
    }
  );

export const flowConsultaSiniestro = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "A continuacion deje el numero de siniestro que quiere consultar",
    "👉 *0* - Cancelar",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const response = ctx.body;
      if (response === "0") {
        return gotoFlow(flowSiniestro);
      }
      if (response.length > 0) {
        return endFlow(
          "Gracias, en breve nos comunicaremos con usted para la consulta de su siniestro (cod#1301)"
        );
      }
      return fallBack("❌ Debe ingresar un numero de siniestro valido");
    }
  );

export const flowOtraConsultaSiniestro = addKeyword(EVENTS.ACTION)
  .addAnswer(["Aqui iria otra consulta"])
  .addAction({ capture: true }, async (ctx, { gotoFlow, endFlow }) => {
    const response = ctx.body;
    if (response === "4") {
      return gotoFlow(flowSiCliente);
    } else
      return endFlow(
        "Gracias, en breve nos comunicaremos con usted para otra consulta sobre siniestro (cod#1302)"
      );
  });

export const flowSiniestro = addKeyword(EVENTS.ACTION)
  .addAnswer("Usted puede...")
  .addAnswer([
    "👉 *1* - Denunciar siniestro",
    "👉 *2* - Consultar siniestro",
    "👉 *3* - Otras consultas",
    "👉 *4* - Volver al menu cliente",
    "👉 *0* - Finalizar conversacion",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const option = ctx.body;
      switch (option) {
        case "1":
          return gotoFlow(flowDenunciaSiniestro);
        case "2":
          return gotoFlow(flowConsultaSiniestro);
        case "3":
          return gotoFlow(flowOtraConsultaSiniestro);
        case "4":
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
