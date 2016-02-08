import {Block} from "../Block";
/**
 * Interfejs za izlazni block. Sadrži block i indeks ulaza na izlaznom blocku.
 */
export interface IOutput {
	block: Block;
	targetIndex: number;
}
