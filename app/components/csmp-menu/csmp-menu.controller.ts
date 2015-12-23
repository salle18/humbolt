import {Component, NgFor, NgModel} from "angular2/angular2";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {SimulationService, ISimulationConfig} from "../../core/services/SimulationService";
import {IntegrationMethod} from "../../csmp/IntegrationMethod";
import {Element} from "../../csmp/Element";

@Component({
	selector: "csmp-menu",
	templateUrl: "components/csmp-menu/csmp-menu.template.html",
	directives: [CsmpUpgradeElement]
})
export class CsmpMenu {

	private simulationService:SimulationService = null;
	public simulationConfig:ISimulationConfig = null;
	public methods:IntegrationMethod[];
	public activeElement:Element = null;

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
		this.simulationConfig = simulationService.simulationConfig;
		this.methods = simulationService.getIntegrationMethods();
	}

	newSimulation() {
		console.log("NEW");
	}

	openSimulation() {
		console.log("OPEN");
	}

	saveSimulation() {
		console.log("SAVE");
	}

	startSimulation() {
		this.simulationService.run();
	}

}
