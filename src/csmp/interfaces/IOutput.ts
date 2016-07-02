import {Block} from "../Block";
/**
 * Interfejs za izlazni blok. Sadrži blok i indeks ulaza na izlaznom bloku.
 */
export interface IOutput {
    block: Block;
    targetIndex: number;
}
