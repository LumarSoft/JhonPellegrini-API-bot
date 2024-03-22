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
      body.forEach(async (contact) => {
        const name = contact.Nombre;
        const phone = contact.Telefono;
        const message = `Hola ${name}, este es un mensaje mapeado desde el excel`;
        await bot.sendMessage(phone, message, {});
      });
      res.end("Mensaje enviado");
    })
  );

  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider,
  });
};

main();
