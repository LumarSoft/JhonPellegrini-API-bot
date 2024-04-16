import { addKeyword } from "@bot-whatsapp/bot";
import { flowBienvenida } from "./flowBienvenida";
import { flowCotizacion } from "./noClientes/flowCotizacion";

export const flowNoCliente = addKeyword("no")
  .addAnswer("Que desea?")
  .addAnswer(
    [
      "Envie en forma de mensaje la letra que aparece al comienzo de la respuesta o inicio para volver a comenzar",
      "👉 A - Solicitar cotizacion",
      "👉 Inicio - Volver al menu principal",
    ],
    null,
    null,
    [flowCotizacion, flowBienvenida]
  );
