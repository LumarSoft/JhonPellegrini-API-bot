import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowCotizacionCliente } from "./clientes/flowCotizacion";
import { flowConsulta } from "./flowBienvenida";
import { flowGrua } from "./clientes/flowGrua";
import { flowSiniestro } from "./clientes/flowSiniestro";
import { flowDocumentacion } from "./clientes/flowDocumentacion";

export const flowSiCliente = addKeyword(EVENTS.ACTION)
  .addAnswer(["Que necesita?"])
  .addAnswer([
    "👉 *1* - Solicitud de documentacion",
    "👉 *2* - Siniestros",
    "👉 *3* - Servicio de grua",
    "👉 *4* - Solicitar cotizacion",
    "👉 *0* - Volver al menu principal",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const resp = ctx.body;
      switch (resp) {
        case "1":
          return gotoFlow(flowDocumentacion);
        case "2":
          return gotoFlow(flowSiniestro);
        case "3":
          return gotoFlow(flowGrua);
        case "4":
          return gotoFlow(flowCotizacionCliente);
        case "0":
          return gotoFlow(flowConsulta);
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
