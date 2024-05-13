export const interactionHandlers = new Map();

export default class {
    constructor(options){
        interactionHandlers.set(options.customId, {run: options.run, useParams: options.useParams});
    }
}