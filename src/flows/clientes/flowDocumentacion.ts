import { addKeyword } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

const flowPoliza = addKeyword("A")
  .addAnswer(
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo"
  )
  .addAnswer("En breve nos comunicaremos con usted");

const flowCuponera = addKeyword("B")
  .addAnswer(
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo"
  )
  .addAnswer("En breve nos comunicaremos con usted");

export const flowDocumentacion = addKeyword("A")
  .addAnswer("Que documentacion necesita?")
  .addAnswer(
    ["👉 A - Poliza", "👉 B - Cuponera", "👉 Volver - Volver al menu cliente"],
    null,
    null,
    [flowPoliza, flowCuponera, flowSiCliente]
  );