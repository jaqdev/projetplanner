/**
 * Divide um array em subarrays de tamanho 7.
 * Útil para separar os dias do calendário em semanas.
 *
 * @param {Array} arr - Array a ser dividido.
 * @returns {Array[]} Array de subarrays com até 7 elementos cada.
 */
export function chunk(arr) {
    const size = 7;
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}