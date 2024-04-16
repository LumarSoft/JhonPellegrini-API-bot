import {
  createBot,
  createFlow,
  MemoryDB,
  createProvider,
} from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";
import cors from "cors";
import { Contact } from "./interfaces/contact";
import { flowBienvenida } from "./flows/flowBienvenida";

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
    "/send-message",
    handleCtx(async (bot, req, res) => {
      const contacts = req.body;
      console.log("contacts", contacts);
      try {
        const promises = contacts.map(async (contact: Contact) => {
          const name = contact.Nombre;
          const phone = contact.Telefono;
          const message = `Hola ${name}, este es un mensaje mapeado desde el excel`;
          await bot.sendMessage(phone, message, {});
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
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider,
  });
};

main();
