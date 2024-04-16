import { addKeyword } from "@bot-whatsapp/bot";

export const flowCotizacion = addKeyword("A")
  .addAnswer("Por favor, deje sus datos, localidad y descripcion del bien")
  .addAnswer("Gracias por su consulta, en breve nos comunicaremos con usted");