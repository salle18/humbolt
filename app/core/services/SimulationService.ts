import {Simulation} from "../../csmp/Simulation";
import {Element} from "../../csmp/Element";
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

	getElements():Element[] {
		return this.simulation.getElements();
	}

	addElement(element:Element):void {
		this.simulation.addElement(element);
	}

	removeElement(key:string):void {
		this.simulation.removeElement(key);
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

	open() {
		console.log("OPEN");
	}

	save() {
		console.log(this.simulation.saveJSON());
	}

	reset():void {
		this.simulation.reset();
	}

	deactivateElements() {
		this.getElements().forEach((element:Element) => {
			element.active = false;
		});
	}

}
