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
exports.flowCotizacionCliente = exports.flowCotizarOtrosRiesgos = exports.flowCotizarAp = exports.flowCotizarComercio = exports.flowCotizarHogar = exports.flowCotizarAutomotor = void 0;
const bot_1 = require("@bot-whatsapp/bot");
const flowCliente_1 = require("../flowCliente");
exports.flowCotizarAutomotor = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer(["Aqui se solicitaria los datos del automotor", "👉 0 - Cancelar"])
    .addAction({ capture: true }, (ctx_1, _a) => __awaiter(void 0, [ctx_1, _a], void 0, function* (ctx, { gotoFlow, endFlow, fallBack }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowCotizacionCliente);
    }
    if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar una informacion valida");
}));
exports.flowCotizarHogar = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer(["Aqui se solicitaria los datos del hogar", "👉 0 - Cancelar"])
    .addAction({ capture: true }, (ctx_2, _b) => __awaiter(void 0, [ctx_2, _b], void 0, function* (ctx, { gotoFlow, endFlow, fallBack }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowCotizacionCliente);
    }
    if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar una informacion valida");
}));
exports.flowCotizarComercio = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer(["Aqui se solicitaria los datos del comercio", "👉 0 - Cancelar"])
    .addAction({ capture: true }, (ctx_3, _c) => __awaiter(void 0, [ctx_3, _c], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowCotizacionCliente);
    }
    if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar una informacion valida");
}));
exports.flowCotizarAp = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer(["Aqui se solicitaria los datos del ap", "👉 0 - Cancelar"])
    .addAction({ capture: true }, (ctx_4, _d) => __awaiter(void 0, [ctx_4, _d], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const response = ctx.body;
    if (response === "0") {
        gotoFlow(exports.flowCotizacionCliente);
    }
    if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar una informacion valida");
}));
exports.flowCotizarOtrosRiesgos = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer(["Aqui iria la cotizacion de otros riesgos", "👉 0 - Cancelar"])
    .addAction({ capture: true }, (ctx_5, _e) => __awaiter(void 0, [ctx_5, _e], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const response = ctx.body;
    if (response === "0") {
        return gotoFlow(exports.flowCotizacionCliente);
    }
    if (response.length > 2) {
        return endFlow("Gracias, en breve nos comunicaremos con usted");
    }
    return fallBack("❌ Debe ingresar una informacion valida");
}));
exports.flowCotizacionCliente = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION)
    .addAnswer("Que desea cotizar?")
    .addAnswer([
    "👉 1 - Automotor",
    "👉 2 - Hogar",
    "👉 3 - Comercio",
    "👉 4 - Ap",
    "👉 5 - Otros riesgos",
    "👉 6 - volver al menu cliente",
])
    .addAction({
    capture: true,
}, (ctx_6, _f) => __awaiter(void 0, [ctx_6, _f], void 0, function* (ctx, { gotoFlow, fallBack, endFlow }) {
    const option = ctx.body;
    switch (option) {
        case "1":
            return gotoFlow(exports.flowCotizarAutomotor);
        case "2":
            return gotoFlow(exports.flowCotizarHogar);
        case "3":
            return gotoFlow(exports.flowCotizarComercio);
        case "4":
            return gotoFlow(exports.flowCotizarAp);
        case "5":
            return gotoFlow(exports.flowCotizarOtrosRiesgos);
        case "6":
            return gotoFlow(flowCliente_1.flowSiCliente);
        default:
            return fallBack("❌ Opción no válida, por favor seleccione una opción válida");
    }
}));
