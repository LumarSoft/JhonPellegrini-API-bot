import { addKeyword } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const flowSiniestro = addKeyword("B")
  .addAnswer("Usted puede...")
  .addAnswer(
    [
      "👉 A - Denunciar siniestro",
      "👉 B - Consultar siniestro",
      "👉 C - Otras consultas",
      "👉 Volver - Volver al menu cliente",
    ],
    null,
    null,
    [flowSiCliente]
  );