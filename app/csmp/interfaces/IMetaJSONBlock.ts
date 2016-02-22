/**
 * JSON format u kome se čuvaju meta podaci o bloku.
 */
export interface IMetaJSONBlock {
    className: string;
    numberOfParams: number;
    numberOfStringParams: number;
    maxNumberOfInputs: number;
    hasOutput:boolean;
    sign: string;
    description: string;
    info: string;
    paramDescription: string[];
    stringParamDescription: string[];
    isAsync: boolean;
}
