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
exports.flowSiniestro = exports.flowOtraConsulta = exports.flowConsultaSiniestro = exports.flowDenunciaSiniestro = void 0;
const bot_1 = require("@bot-whatsapp/bot");
const flowCliente_1 = require("../flowCliente");
exports.flowDenunciaSiniestro = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer([
    "A continuacion deje la siguiente informacion",
    "DNI del involucrado, Numero de poliza, Fecha del siniestro, Lugar del siniestro, Descripcion del siniestro",
    "👉 0 - Cancelar",
])
    .addAction({ capture: true }, (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const response = ctx.body;
    if (response === "0") {
        gotoFlow(exports.flowSiniestro);
    }
    if (response.length > 0) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar una informacion valida");
}));
exports.flowConsultaSiniestro = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer([
    "A continuacion deje el numero de siniestro que quiere consultar",
    "👉 0 - Cancelar",
])
    .addAction({ capture: true }, (ctx_2, _b) => __awaiter(void 0, [ctx_2, _b], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowSiniestro);
    }
    if (response.length > 0) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar un numero de siniestro valido");
}));
exports.flowOtraConsulta = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer(["Aqui iria otra consulta"])
    .addAction({ capture: true }, (ctx_3, _c) => __awaiter(void 0, [ctx_3, _c], void 0, function* (ctx, { endFlow }) {
    const response = ctx.body;
    if (response) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
}));
exports.flowSiniestro = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer("Usted puede...")
    .addAnswer([
    "👉 1 - Denunciar siniestro",
    "👉 2 - Consultar siniestro",
    "👉 3 - Otras consultas",
    "👉 4 - Volver al menu cliente",
])
    .addAction({ capture: true }, (ctx_4, _d) => __awaiter(void 0, [ctx_4, _d], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const option = ctx.body;
    switch (option) {
        case "1":
            return gotoFlow(exports.flowDenunciaSiniestro);
        case "2":
            return gotoFlow(exports.flowConsultaSiniestro);
        case "3":
            return gotoFlow(exports.flowOtraConsulta);
        case "4":
            return gotoFlow(flowCliente_1.flowSiCliente);
        default:
            return fallBack("❌ Opción no válida, por favor seleccione una opción válida");
    }
}));
