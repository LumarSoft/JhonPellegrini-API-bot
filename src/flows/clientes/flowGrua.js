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
exports.flowGrua = void 0;
const bot_1 = require("@bot-whatsapp/bot");
const flowCliente_1 = require("../flowCliente");
exports.flowGrua = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer("Si necesita una grua puede llamar al numero 08106660302.")
    .addAnswer("Recordatorio: La cobertura A no posee asistencia de grua")
    .addAnswer("👉 0 - Volver al menu cliente")
    .addAction({ capture: true }, (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { gotoFlow, fallBack }) {
    const option = ctx.body;
    switch (option) {
        case "0":
            return gotoFlow(flowCliente_1.flowSiCliente);
        default:
            return fallBack("❌ Opción no válida, por favor seleccione una opción válida");
    }
}));
