import {Block} from "./Block";

/**
 * Klasa za prazan block bez parametara i ulaza.
 * Koristi se kao prazan ulaz na bloku.
 */
export class EmptyBlock extends Block {

    public sorted:boolean = true;

    getIndex():number {
        return -1;
    }

}
