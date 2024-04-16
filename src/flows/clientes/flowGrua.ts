import { addKeyword } from "@bot-whatsapp/bot";
import { flowSiCliente } from "../flowCliente";

export const flowGrua = addKeyword("C")
  .addAnswer("Si necesita una grua puede llamar al numero 08106660302.")
  .addAnswer("Recordatorio: La cobertura A no posee asistencia de grua")
  .addAnswer('Escriba "Volver" para volver al menu cliente', null, null, [
    flowSiCliente,
  ]);
