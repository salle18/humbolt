import {Injectable} from "angular2/angular2";
import {Simulation} from "../../csmp/Simulation";
import {Element} from "../../csmp/Element";
import * as IntegrationMethodDefinitions from "../../csmp/IntegrationMethodDefinitions";
import {IntegrationMethod} from "../../csmp/IntegrationMethod";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";

export interface ISimulationConfig {
	method: string;
	interval: number;
	duration: number;
}

@Injectable()
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
		this.plumbService.getInstance().reset();
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
			let plumbServiceInstance = this.plumbService.getInstance();
			let key = this.activeElement.key;
			plumbServiceInstance.detachAllConnections(key, {
				fireEvent: false
			});
			plumbServiceInstance.removeAllEndpoints(key);
			plumbServiceInstance.detach(key);
			this.simulation.removeElement(key);
			this.activeElement = null;
		}
	}

}
