import { addKeyword, EVENTS } from "@bot-whatsapp/bot";
import { flowNoCliente } from "./flowNoCliente";
import { flowSiCliente } from "./flowCliente";

export const flowConsulta = addKeyword(EVENTS.ACTION)
  .addAnswer([
    "Hola! Te comunicaste JPMG.",
    "Necesitamos saber si sos cliente",
    "👉 1 - Si",
    "👉 2 - No",
    "👉 3 - Chau",
  ])
  .addAction(
    { capture: true },
    async (ctx, { gotoFlow, fallBack, endFlow }) => {
      const message = ctx.body;
      if (message === "3") {
        return endFlow("Nos vemos luego");
      } else if (message === "1") {
        return gotoFlow(flowSiCliente);
      } else if (message === "2") {
        return gotoFlow(flowNoCliente);
      }
      return fallBack(
        "❌ Opción no válida, por favor selecciona una opción válida"
      );
    }
  );

export const flowRechazoRapipago = addKeyword(EVENTS.ACTION).addAnswer([
  "Usted ha seleccionado la opción cupón de pago de rapipago",
  "Dentro de las 24hs te estaremos enviado el cupon de pago",
]);

export const flowRechazoCreditoDebito = addKeyword(EVENTS.ACTION).addAnswer([
  "Usted ha seleccionado la opción de pago con tarjeta de credito o debito",
  "Dentro de las 24hs nos estaremos contactando para tomar el pago",
  "O comunicate telefonicamente de lunes a viernes de 8 a 16hs",
]);

export const flowRechazoTransferencia = addKeyword(EVENTS.ACTION).addAnswer([
  "Usted ha seleccionado la opción de pago por transferencia bancaria",
  "Realizar transferencia al CBU 0070081820000004432793 -   ALIAS:  TRUENO.VUELO.DELTA    -   CUENTA CORRIENTE EN PESOS: 4432-7 081-9         TRIUNFO COOP. DE SEGUROS LTDA.  CUIT  30-50006577-6 ",
  "Una vez realizado, por favor enviar el COMPROBANTE por este medio",
]);

export const flowBienvenida = addKeyword(EVENTS.WELCOME).addAction(
  async (ctx, { gotoFlow }) => {
    const message = ctx.body;
    if (message.toLowerCase() === "hola") {
      return gotoFlow(flowConsulta);
    }
    if (message.toLowerCase() === "rp") {
      return gotoFlow(flowRechazoRapipago);
    }
    if (message.toLowerCase() === "cd") {
      return gotoFlow(flowRechazoCreditoDebito);
    }
    if (message.toLocaleLowerCase() === "pt") {
      return gotoFlow(flowRechazoTransferencia);
    }
    return;
  }
);
