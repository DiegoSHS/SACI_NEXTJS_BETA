/**
 * @constant months - Array with the name of the months in spanish
 */
export const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
/**
 * Create a random integer number
 * @param {Number} min minimum value
 * @param {Number} max maximum value
 * @returns
 */
export const RandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * Create a random float number
 * @param {Number} min minimum value
 * @param {Number} max maximum value
 * @param {Number} decimals number of decimals
 * @returns 
 */
export const RandomFloat = (min, max, decimals) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals)
    return parseFloat(str)
}
