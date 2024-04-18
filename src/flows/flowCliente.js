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
exports.flowSiCliente = void 0;
const bot_1 = require("@bot-whatsapp/bot");
const flowCotizacion_1 = require("./clientes/flowCotizacion");
const flowBienvenida_1 = require("./flowBienvenida");
const flowGrua_1 = require("./clientes/flowGrua");
const flowSiniestro_1 = require("./clientes/flowSiniestro");
const flowDocumentacion_1 = require("./clientes/flowDocumentacion");
exports.flowSiCliente = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer(["Que necesita?"])
    .addAnswer([
    "👉 1 - Solicitud de documentacion",
    "👉 2 - Siniestros",
    "👉 3 - Servicio de grua",
    "👉 4 - Solicitar cotizacion",
    "👉 0 - Volver al menu principal",
])
    .addAction({ capture: true }, (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const resp = ctx.body;
    switch (resp) {
        case "1":
            return gotoFlow(flowDocumentacion_1.flowDocumentacion);
        case "2":
            return gotoFlow(flowSiniestro_1.flowSiniestro);
        case "3":
            return gotoFlow(flowGrua_1.flowGrua);
        case "4":
            return gotoFlow(flowCotizacion_1.flowCotizacionCliente);
        case "0":
            return gotoFlow(flowBienvenida_1.flowConsulta);
        default:
            return fallBack("❌ Opción no válida, por favor seleccione una opción válida");
    }
}));
