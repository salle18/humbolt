import {IJSONBlock} from "./IJSONBlock";

export interface IJSONSimulation {
    description: string;
    created_at: string;
    method: string;
    duration: number;
    integrationInterval: number;
    blocks: IJSONBlock[];
    optimizeAsync: boolean;
}
