export const interactionHandlers = new Map();

export default class {
    constructor(options){
        interactionHandlers.set(options.customId, {callback: options.callback, useParams: options.useParams});
    }
}