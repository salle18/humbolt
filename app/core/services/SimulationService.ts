import {Simulation} from "../../csmp/Simulation";
import {Block} from "../../csmp/Block";
import * as IntegrationMethodDefinitions from "../../csmp/IntegrationMethodDefinitions";
import {IntegrationMethod} from "../../csmp/IntegrationMethod";

export interface ISimulationConfig {
	method: string;
	interval: number;
	duration: number;
}

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

	getIntegrationMethods():IntegrationMethod[] {
		let methods:IntegrationMethod[] = [];
		for (let key in IntegrationMethodDefinitions) {
			methods.push(new IntegrationMethodDefinitions[key]);
		}
		return methods;
	}

	run() {
		this.simulation.run(this.simulationConfig.method, this.simulationConfig.interval, this.simulationConfig.duration);
	}
	
	reset():void {
		this.simulation.reset();
	}

	deactivateBlocks() {
		this.getBlocks().forEach((block:Block) => {
			block.active = false;
		});
	}

}
