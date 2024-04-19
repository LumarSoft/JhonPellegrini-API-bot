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
exports.flowNoCliente = exports.flowCotizacionNoCliente = void 0;
const bot_1 = require("@bot-whatsapp/bot");
const flowBienvenida_1 = require("./flowBienvenida");
exports.flowCotizacionNoCliente = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer([
    "Por favor deje sus datos (localidad y descripcion del bien)",
    "👉 0 - Cancelar",
])
    .addAction({ capture: true }, (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowNoCliente);
    }
    if (response.length > 2) {
        return endFlow("En breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar una localidad y descripcion del bien");
}));
exports.flowNoCliente = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer("Nos alegra que este interesado en nosotros")
    .addAnswer([
    "Que desea hacer?",
    "👉 1 - Solicitar cotizacion",
    "👉 0 - Volver al menu principal",
])
    .addAction({ capture: true }, (ctx_2, _b) => __awaiter(void 0, [ctx_2, _b], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const option = ctx.body;
    switch (option) {
        case "1":
            return gotoFlow(exports.flowCotizacionNoCliente);
        case "0":
            return gotoFlow(flowBienvenida_1.flowConsulta);
        default:
            return fallBack("❌ Opción no válida, por favor seleccione una opción válida");
    }
}));
