import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

const flowDenunciaSiniestro = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria la denuncia del siniestro",
]);

const flowConsultaSiniestro = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria la consulta siniestro",
]);

const flowOtraConsulta = addKeyword(EVENTS.ACTION).addAnswer([
  "Aqui iria otra consulta",
]);

export const flowSiniestro = addKeyword(EVENTS.ACTION)
  .addAnswer("Usted puede...")
  .addAnswer([
    "👉 1 - Denunciar siniestro",
    "👉 2 - Consultar siniestro",
    "👉 3 - Otras consultas",
    "👉 4 - Volver al menu cliente",
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
          return gotoFlow(flowOtraConsulta);
        case "4":
          return gotoFlow(flowSiCliente);
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
