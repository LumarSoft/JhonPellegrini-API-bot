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
  flowCuponera,
  flowDocumentacion,
  flowPoliza,
} from "./flows/clientes/flowDocumentacion";
import {
  flowConsultaSiniestro,
  flowDenunciaSiniestro,
  flowOtraConsulta,
  flowSiniestro,
} from "./flows/clientes/flowSiniestro";
import { flowGrua } from "./flows/clientes/flowGrua";
import {
  flowCotizacionCliente,
  flowCotizarAp,
  flowCotizarAutomotor,
  flowCotizarComercio,
  flowCotizarHogar,
  flowCotizarOtrosRiesgos,
} from "./flows/clientes/flowCotizacion";

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

          const message1 = `Hola ${name}, nos comunicamos desde JPMG para informarte que nos llego rechazado el debito automatico de la cuota del seguro. Selecciona las opciones para gestionar y abonar el mismo dentro de las 48 hs para evitar quedar sin cobertura`;
          const message2 = `👉 RP - Envio cupon de pago para abonar en Rapipago, pago fácil santa fe servicios
          👉 CD - Pago con tarjeta de crédito o debito
          👉 PT - Pago por transferencia`;
          await bot.sendMessage(phone, message1, {});
          await bot.sendMessage(phone, message2, {});
        });
        await Promise.all(promises);
      } catch (error) {
        console.error("Error al enviar mensajes:", error);
      }
      res.end("Mensajes enviados");
    })
  );

  provider.http?.server.get("/funciona", (req, res) => {
    res.end("Funciona");
  });

  // para cuando se desconecta
  provider.on("disconnect", () => {
    console.log("Se desconectó el bot");
  });

  await createBot({
    flow: createFlow([
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
      flowSiniestro,
      flowDenunciaSiniestro,
      flowConsultaSiniestro,
      flowOtraConsulta,
      flowGrua,
      flowCotizacionCliente,
      flowCotizarAutomotor,
      flowCotizarHogar,
      flowCotizarComercio,
      flowCotizarAp,
      flowCotizarOtrosRiesgos,
    ]),
    database: new MemoryDB(),
    provider,
  });
};

main();
