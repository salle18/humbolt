import {Injectable} from "angular2/angular2";
import {Simulation} from "../../csmp/Simulation";
import {Block} from "../../csmp/Block";

export interface ISimulationConfig {
	method: string;
	interval: number;
	duration: number;
}

@Injectable()
export class SimulationService {

	private simulation:Simulation = null;

	public simulationConfig:ISimulationConfig = {
		method: "RungeKuttaIV",
		interval: 0.01,
		duration: 10
	};

	constructor() {
		this.simulation = new Simulation;
	}

	getBlocks():Block[] {
		return this.simulation.getBlocks();
	}

	getBlock(key:string):Block {
		return this.simulation.getBlock(key);
	}

	addBlock(block:Block):void {
		this.simulation.addBlock(block);
	}

	removeBlock(key:string):void {
		this.simulation.removeBlock(key);
	}

	getIntegrationMethods():string[] {
		let methods:string[] = [];
		return methods;
	}

	run() {

	}

	reset():void {
		this.simulation.reset();
	}

	getSimulationResults() {

	}

	deactivateBlocks() {
		this.getBlocks().forEach((block:Block) => {
			block.active = false;
		});
	}

}
