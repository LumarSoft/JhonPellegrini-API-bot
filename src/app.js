"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("@bot-whatsapp/bot");
const provider_baileys_1 = require("@bot-whatsapp/provider-baileys");
const cors_1 = __importDefault(require("cors"));
const flowBienvenida = (0, bot_1.addKeyword)("hola").addAnswer(
  "Hola, ¿en qué puedo ayudarte?"
);
const main = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const provider = (0, bot_1.createProvider)(
      provider_baileys_1.BaileysProvider
    );
    provider.initHttpServer(3002);
    (_a = provider.http) === null || _a === void 0
      ? void 0
      : _a.server.use(
          (0, cors_1.default)({
            origin: "*",
            methods: "POST",
          })
        );
    (_b = provider.http) === null || _b === void 0
      ? void 0
      : _b.server.post(
          "/send-message",
          (0, provider_baileys_1.handleCtx)((bot, req, res) =>
            __awaiter(void 0, void 0, void 0, function* () {
              const body = req.body;
              body.forEach((contact) =>
                __awaiter(void 0, void 0, void 0, function* () {
                  const name = contact.Nombre;
                  const phone = contact.Telefono;
                  const message = `Hola ${name}, este es un mensaje mapeado desde el excel`;
                  yield bot.sendMessage(phone, message, {});
                })
              );
              res.end("Mensaje enviado");
            })
          )
        );
    (_c = provider.http) === null || _c === void 0
      ? void 0
      : _c.server.get("/funciona", (req, res) => {
          res.end("Funciona");
        });
    yield (0, bot_1.createBot)({
      flow: (0, bot_1.createFlow)([flowBienvenida]),
      database: new bot_1.MemoryDB(),
      provider,
    });
  });
main();