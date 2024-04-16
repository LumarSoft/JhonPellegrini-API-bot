import { addKeyword } from "@bot-whatsapp/bot";
import { flowBienvenida } from "./flowBienvenida";
import { flowDocumentacion } from "./clientes/flowDocumentacion";
import { flowSiniestro } from "./clientes/flowSiniestro";
import { flowGrua } from "./clientes/flowGrua";
import { flowCotizacion } from "./clientes/flowCotizacion";

export const flowSiCliente = addKeyword(["si", "volver"])
  .addAnswer("Que desea?")
  .addAnswer(
    [
      "Envie en forma de mensaje la letra que aparece al comienzo de la respuesta o incio para volver a comenzar",
      "👉 A - Solicitud de documentacion",
      "👉 B - Siniestros",
      "👉 C - Servicio de grua",
      "👉 D - Solicitar cotizacion",
      "👉 E - Otras consultas",
      "👉 Inicio - Volver al menu principal",
    ],
    null,
    null,
    [flowDocumentacion, flowSiniestro, flowGrua, flowCotizacion, flowBienvenida]
  );
