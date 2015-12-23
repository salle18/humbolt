import {Simulation} from "../../csmp/Simulation";
import {Element} from "../../csmp/Element";
import * as IntegrationMethodDefinitions from "../../csmp/IntegrationMethodDefinitions";
import {IntegrationMethod} from "../../csmp/IntegrationMethod";
import {PlumbServiceUtilities} from "./PlumbService";
import {PlumbService} from "./PlumbService";

export interface ISimulationConfig {
	method: string;
	interval: number;
	duration: number;
}

export class SimulationService {

	private simulation:Simulation = null;
	private plumbService:PlumbService;
	private plumbServiceUtilities:PlumbServiceUtilities = null;

	public activeElement:Element = null;

	public simulationConfig:ISimulationConfig = {
		method: "RungeKuttaIV",
		interval: 0.01,
		duration: 10
	};

	constructor(plumbService:PlumbService, plumbServiceUtilities:PlumbServiceUtilities) {
		this.simulation = new Simulation;
		this.plumbService = plumbService;
		this.plumbServiceUtilities = plumbServiceUtilities;
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

	getActiveElement():Element {
		return this.activeElement;
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

	}

	save() {
		console.log(this.simulation.saveJSON());
	}

	reset():void {
		this.activeElement = null;
		this.simulation.reset();
	}

	rotateActiveElement() {
		if (this.activeElement) {
			this.plumbServiceUtilities.rotate(this.activeElement);
		}
	}

	removeActiveElement() {
		if (this.activeElement) {
			this.plumbService.getInstance().detachAllConnections(this.activeElement.key, {
				fireEvent: false
			});
			this.plumbService.getInstance().removeAllEndpoints(this.activeElement.key);
			this.plumbService.getInstance().detach(this.activeElement.key);
			this.simulation.removeElement(this.activeElement.key);
			this.activeElement = null;
		}
	}

}
