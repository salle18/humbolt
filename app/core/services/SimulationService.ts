import {Injectable} from "angular2/core";
import {Simulation, IJSONSimulation, ISimulationConfig} from "../../csmp/Simulation";
import {Block} from "../../csmp/Block";

export interface ISimulationFilter {
	label: string;
	value: boolean;
}

@Injectable()
export class SimulationService {

	private simulation:Simulation;
	private filters:ISimulationFilter[] = [];

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
		return this.simulation.getResults();
	}

	setSimulationResults(results:number[][]):void {
		this.simulation.setResults(results);
	}

	getFilteredSimulationResults():number[][] {
		let results = this.getSimulationResults();
		return results.filter((item, i) => {
			return this.filters[i].value;
		});
	}

	initFilters():void {
		this.filters = this.getLabels().map(label => {
			return {
				label: label,
				value: false
			}
		});
	}

	getSimulationFilters():ISimulationFilter[] {
		return this.filters;
	}

	getSimulationConfig():ISimulationConfig {
		return this.simulation.getConfig();
	}

	deactivateBlocks() {
		this.getBlocks().forEach((block:Block) => {
			block.active = false;
		});
	}

	emptyOutputs():void {
		let blocks = this.getBlocks();
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].outputs = [];
		}
	}

	getLabels():string[] {
		return ["time"].concat(this.getBlocks().map(block => block.getIndexDescription()));
	}

	isAsync():boolean {
		return this.simulation.isAsync();
	}

	loadSimulation(JSONSimulation:IJSONSimulation, blocks:Block[]):void {
		this.simulation.loadSimulation(JSONSimulation, blocks);
	}

}
