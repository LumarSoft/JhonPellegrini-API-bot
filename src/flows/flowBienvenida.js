"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowBienvenida = exports.flowConsulta = void 0;
const bot_1 = require("@bot-whatsapp/bot");
const flowNoCliente_1 = require("./flowNoCliente");
const flowCliente_1 = require("./flowCliente");
exports.flowConsulta = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer([
    "Hola! Te comunicaste JPMG.",
    "Necesitamos saber si sos cliente",
    "👉 1 - Si",
    "👉 2 - No",
    "👉 3 - Chau",
])
    .addAction({ capture: true }, (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const message = ctx.body;
    if (message === "3") {
        return endFlow("Nos vemos luego");
    }
    else if (message === "1") {
        return gotoFlow(flowCliente_1.flowSiCliente);
    }
    else if (message === "2") {
        return gotoFlow(flowNoCliente_1.flowNoCliente);
    }
    return fallBack("❌ Opción no válida, por favor selecciona una opción válida");
}));
exports.flowBienvenida = (0, bot_1.addKeyword)(bot_1.EVENTS.WELCOME).addAction((ctx_2, _b) => __awaiter(void 0, [ctx_2, _b], void 0, function* (ctx, { gotoFlow }) {
    const message = ctx.body;
    if (message.toLowerCase() === "hola") {
        return gotoFlow(exports.flowConsulta);
    }
    return;
}));
