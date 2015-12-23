import {Simulation} from "../../csmp/Simulation";
import {Element} from "../../csmp/Element";

export class SimulationService {

	private simulation:Simulation;

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

}
