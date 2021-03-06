import {IPosition} from "./IPosition";

/**
 * JSON format u kome se čuvaju blokovi simulacije i koji se šalje serveru.
 */
export interface IJSONBlock {
    className: string;
    position: IPosition;
    params: number[];
    stringParams: string[];
    inputs: number[];
    rotation: number;
}
