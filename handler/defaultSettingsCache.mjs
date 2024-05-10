import { CustomError } from "../index.mjs"
const defaultSettingsCache = new Map();

const settings = class {
    set = (component, value) => {
        if (!component) throw new CustomError('cyan', '>> set: Component (string) is required');
        if (!value) throw new CustomError('cyan', '>> set: Value (object) is required');

        defaultSettingsCache.set(component, value);
    }

    get = (component) => {
        if (!component) throw new CustomError('cyan', '>> get: Component (string) is required');

        return defaultSettingsCache.get(component);
    }
}

export default new settings();