import { addKeyword } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const flowCotizacion = addKeyword("D")
  .addAnswer("Que desea cotizar?")
  .addAnswer(
    [
      "👉 A - Automotor",
      "👉 B - Hogar",
      "👉 C - Comercio",
      "👉 D - Ap",
      "👉 E - Otros riesgos",
      "👉 Volver - volver al menu cliente",
    ],
    null,
    null,
    [flowSiCliente]
  );