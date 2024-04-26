import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowCotizacionCliente } from "./clientes/flowCotizacion";
import { flowConsulta } from "./flowBienvenida";
import { flowGrua } from "./clientes/flowGrua";
import { flowSiniestro } from "./clientes/flowSiniestro";
import { flowDocumentacion } from "./clientes/flowDocumentacion";
import { flowOtraConsulta } from "./clientes/flowOtraConsulta";

export const flowSiCliente = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Que necesita?",
    "*RECORDATORIO*: Los horarios de atencion son de 8 a 16hs",
  ])
  .addAnswer([
    "👉 *1* - Solicitud de documentacion",
    "👉 *2* - Siniestros",
    "👉 *3* - Servicio de grua",
    "👉 *4* - Solicitar cotizacion",
    "👉 *5* - Otra consulta",
    "👉 *6* - Volver al menu principal",
    "👉 *0* - Finalizar conversacion",
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
        case "5":
          return gotoFlow(flowOtraConsulta);
        case "6":
          return gotoFlow(flowConsulta);
        case "0":
          return endFlow("Nos vemos luego");
        default:
          return fallBack(
            "❌ Opción no válida, por favor seleccione una opción válida"
          );
      }
    }
  );
