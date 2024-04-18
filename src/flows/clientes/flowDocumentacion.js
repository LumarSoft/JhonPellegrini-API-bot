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
exports.flowDocumentacion = exports.flowCuponera = exports.flowPoliza = void 0;
const bot_1 = require("@bot-whatsapp/bot");
const flowCliente_1 = require("../flowCliente");
exports.flowPoliza = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer([
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo",
    "👉 0 - Para cancelar",
])
    .addAction({ capture: true }, (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { gotoFlow, endFlow, fallBack }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowDocumentacion);
    }
    if (response.length > 0) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar un dni o patente válida");
}));
exports.flowCuponera = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer([
    "Por favor deje el dni del titular o patente en caso de ser un vehiculo",
    "👉 0 - Para cancelar",
])
    .addAction({ capture: true }, (ctx_2, _b) => __awaiter(void 0, [ctx_2, _b], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowDocumentacion);
    }
    if (response !== "0" && response.length > 0) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar un dni o patente válida");
}));
exports.flowDocumentacion = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer("Que documentacion necesita?")
    .addAnswer([
    "👉 1 - Poliza",
    "👉 2 - Cuponera",
    "👉 3 - Volver al menu cliente",
])
    .addAction({ capture: true }, (ctx_3, _c) => __awaiter(void 0, [ctx_3, _c], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const option = ctx.body;
    switch (option) {
        case "1":
            return gotoFlow(exports.flowPoliza);
        case "2":
            return gotoFlow(exports.flowCuponera);
        case "3":
            return gotoFlow(flowCliente_1.flowSiCliente);
        default:
            return fallBack("❌ Opción no válida, por favor seleccione una opción válida");
    }
}));
