const colorMap = {
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37
}

export default class CustomError {
    constructor(color, error) {
        if (!color) return new Error('>> ErrorHandler: color is required');
        if (!error) return new Error('>> ErrorHandler: error is required');

        if (!colorMap[color]) return new Error('>> ErrorHandler: color not found');
        const colorInMap = colorMap[color];

        return new Error(`\x1b[${colorInMap}m${error}\x1b[0m`);
    }
}