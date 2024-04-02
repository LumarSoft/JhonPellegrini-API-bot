import {
  createBot,
  createFlow,
  MemoryDB,
  createProvider,
  addKeyword,
} from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";
import cors from "cors";

const flowBienvenida = addKeyword("hola").addAnswer(
  "Hola, ¿en qué puedo ayudarte?"
);

interface Contact {
  Nombre: string;
  Telefono: string;
}

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
      const body = req.body;
      body.forEach(async (contact: Contact) => {
        const name = contact.Nombre;
        const phone = contact.Telefono;
        const message = `Hola ${name}, este es un mensaje mapeado desde el excel`;
        try {
          await bot.sendMessage(phone, message, {});
        } catch (error) {
          console.error(`Error al enviar mensaje a ${phone}:`, error);
        }
      });
      res.end("Mensaje enviado");
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
