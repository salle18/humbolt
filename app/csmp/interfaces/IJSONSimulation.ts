import {IJSONBlock} from "./IJSONBlock";

export interface IJSONSimulation {
    description: string;
    date: number;
    method: string;
    duration: number;
    integrationInterval: number;
    blocks: IJSONBlock[];
    optimizeAsync: boolean;
}
