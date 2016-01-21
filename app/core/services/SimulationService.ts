import {Injectable} from "angular2/angular2";
import {Simulation, IJSONSimulation, ISimulationConfig} from "../../csmp/Simulation";
import {Block} from "../../csmp/Block";

@Injectable()
export class SimulationService {

	private simulation:Simulation = null;

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

	saveJSON():IJSONSimulation {
		return this.simulation.saveJSON();
	}

	reset():void {
		this.simulation.reset();
	}

	getSimulationResults():number[][] {
		return [];
	}

	getSimulationConfig():ISimulationConfig {
		return this.simulation.getSimulationConfig();
	}

	setSimulationConfig(config:ISimulationConfig):void {
		this.simulation.setSimulationConfig(config);
	}

	deactivateBlocks() {
		this.getBlocks().forEach((block:Block) => {
			block.active = false;
		});
	}

}
