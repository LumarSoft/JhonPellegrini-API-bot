import { addKeyword } from "@bot-whatsapp/bot";
import { flowNoCliente } from "../flowNoCliente";

export const flowCotizacion = addKeyword("A")
  .addAnswer("Por favor, deje sus datos, localidad y descripcion del bien")
  .addAnswer(
    [
      "Gracias por su consulta, en breve nos comunicaremos con usted",
      "Desea realizar una consulta mas?",
      "👉 Si",
      "👉 No",
    ],
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow }) => {
      if (ctx.body === "No") {
        return await gotoFlow(flowNoCliente);
      }
    }
  );
