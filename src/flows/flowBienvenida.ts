import { addKeyword } from "@bot-whatsapp/bot";
import { flowSiCliente } from "./flowCliente";
import { flowNoCliente } from "./flowNoCliente";

export const flowBienvenida = addKeyword(["hola", "Inicio"])
  .addAnswer("Hola, te comunicaste con JPMG")
  .addAnswer(
    ["Para continuar necesitamos saber si ya sos cliente?", "👉 Si", "👉 No"],
    null,
    null,
    [flowNoCliente, flowSiCliente]
  );
