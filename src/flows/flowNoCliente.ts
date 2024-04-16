import { addKeyword } from "@bot-whatsapp/bot";
import { flowBienvenida } from "./flowBienvenida";

const flowSiCotizacion = addKeyword("A")
  .addAnswer("Por favor, deje sus datos, localidad y descripcion del bien")
  .addAnswer("Gracias por su consulta, en breve nos comunicaremos con usted")
  .addAnswer("Necesita algo mas?", null, null, [flowNoCliente]);

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
    [flowSiCotizacion,flowBienvenida]
  );
