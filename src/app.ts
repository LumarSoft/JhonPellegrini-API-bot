import {
  createBot,
  createFlow,
  MemoryDB,
  createProvider,
} from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";
import cors from "cors";
import { Contact } from "./interfaces/contact";
import {
  flowBienvenida,
  flowConsulta,
  flowRechazoCreditoDebito,
  flowRechazoRapipago,
  flowRechazoTransferencia,
} from "./flows/flowBienvenida";
import { flowCotizacionNoCliente, flowNoCliente } from "./flows/flowNoCliente";
import { flowSiCliente } from "./flows/flowCliente";
import {
  flowConfirmacionCuponera,
  flowConfirmacionPoliza,
  flowCuponera,
  flowDocumentacion,
  flowPoliza,
} from "./flows/clientes/flowDocumentacion";
import {
  flowConsultaSiniestro,
  flowContinuacionSiniestro,
  flowDenunciaSiniestro,
  flowOtraConsultaSiniestro,
  flowSiniestro,
} from "./flows/clientes/flowSiniestro";
import { flowGrua } from "./flows/clientes/flowGrua";
import {
  continuacionCotizacion,
  flowCotizacionCliente,
  flowCotizarAp,
  flowCotizarAutomotor,
  flowCotizarComercio,
  flowCotizarHogar,
  flowCotizarOtrosRiesgos,
} from "./flows/clientes/flowCotizacion";
import {
  FlowContinuar,
  flowOtraConsulta,
} from "./flows/clientes/flowOtraConsulta";
import { blackListFlow } from "./flows/blacklistflow";
import { idleFlow } from "./idleCustom";
import { inactivityFlow } from "./flows/inactivityFlow";

const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(3002);

  provider.http?.server.use(
    cors({
      origin: "*",
      methods: "POST",
    })
  );

  provider.http?.server.post(
    "/rechazos",
    handleCtx(async (bot, req, res) => {
      const contacts = req.body;
      try {
        const promises = contacts.map(async (contact: Contact) => {
          const name = contact.Asegurado;
          const phone = Number("549" + contact["Tel. Celular"]);
          const amount = contact.Importe;

          const message1 = `Hola ${name}, nos comunicamos desde JPMG para informarte que nos llego rechazado el débito automatico de la cuota del seguro. El importe a pagar es de ${amount}. Seleccioná las opciones para gestionar y abonar el mismo dentro de las 48 hs para evitar quedar sin cobertura`;
          const message2 = `
          👉 *EF* - Envío cupon de pago para abonar en Rapipago, pago fácil o santa fe servicios.
          👉 *TC* - Pago con tarjeta de crédito o débito.
          👉 *TR* - Pago por transferencia.`;
          await bot.sendMessage(phone, message1, {});
          await bot.sendMessage(phone, message2, {});
        });
        await Promise.all(promises);
      } catch (error) {
        console.error("Error al enviar mensajes:", error);
      }
      res.end("Mensajes enviados.");
    })
  );

  provider.http?.server.get("/funciona", (req, res) => {
    res.end("Funciona.");
  });

  // para cuando se desconecta
  provider.on("disconnect", () => {
    console.log("Se desconectó el bot.");
  });

  await createBot({
    flow: createFlow([
      blackListFlow,
      flowBienvenida,
      flowRechazoRapipago,
      flowRechazoCreditoDebito,
      flowRechazoTransferencia,
      flowConsulta,
      flowNoCliente,
      flowCotizacionNoCliente,
      flowSiCliente,
      flowDocumentacion,
      flowPoliza,
      flowCuponera,
      flowConfirmacionPoliza,
      flowConfirmacionCuponera,
      flowSiniestro,
      flowDenunciaSiniestro,
      flowConsultaSiniestro,
      flowOtraConsultaSiniestro,
      flowContinuacionSiniestro,
      flowGrua,
      flowCotizacionCliente,
      flowCotizarAutomotor,
      flowCotizarHogar,
      flowCotizarComercio,
      flowCotizarAp,
      flowCotizarOtrosRiesgos,
      continuacionCotizacion,
      flowOtraConsulta,
      FlowContinuar,
      idleFlow,
      inactivityFlow,
    ]),
    database: new MemoryDB(),
    provider,
  });
};

main();
