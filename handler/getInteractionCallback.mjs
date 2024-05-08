import { interactionHandlers } from "./InteractionHandler.mjs";

export default (interaction_id) => {
    const handler = interactionHandlers.get(interaction_id);
    if (!handler) return;

    return handler.callback;
}