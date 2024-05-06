import { addKeyword, EVENTS } from "@bot-whatsapp/bot";

export const inactivityFlow = addKeyword(EVENTS.ACTION).addAction(
  async (_, { endFlow }) => {
    return endFlow("La conversacion ha finalizado por inactividad.");
  }
);
