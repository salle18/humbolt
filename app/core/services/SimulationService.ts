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
	private results:number[][] = [];
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
		return this.results;
	}

	setSimulationResults(results:number[][]):void {
		this.results = results;
	}

	getFilteredSimulationResults():number[][] {
		let results = this.getSimulationResults();
		let filteredResults:number[][] = [];
		console.log(results);
		console.log(this.filters);
		for (let i = 0; i < results.length; i++) {
			filteredResults.push(results[i].filter((item, j) => {
				return j === 0 || this.filters[j - 1].value;
			}));
		}
		return filteredResults;
	}

	initFilters():void {
		this.filters = this.getLabels().map(label => {
			return {
				label: label,
				value: false
			};
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
		return this.getBlocks().map(block => block.getIndexDescription());
	}

	getFilteredLabels():string[] {
		return this.getLabels().filter((label, index) => {
			return this.filters[index].value;
		});
	}

	isAsync():boolean {
		return this.simulation.isAsync();
	}

	loadSimulation(JSONSimulation:IJSONSimulation, blocks:Block[]):void {
		this.simulation.loadSimulation(JSONSimulation, blocks);
	}

}
