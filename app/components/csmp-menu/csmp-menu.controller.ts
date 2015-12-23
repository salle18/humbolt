import {Component} from "angular2/angular2";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {SimulationService, ISimulationConfig} from "../../core/services/SimulationService";
import {IntegrationMethod} from "../../csmp/IntegrationMethod";

@Component({
	selector: "csmp-menu",
	templateUrl: "components/csmp-menu/csmp-menu.template.html",
	directives: [CsmpUpgradeElement]
})
export class CsmpMenu {

	private simulationService:SimulationService = null;
	public simulationConfig:ISimulationConfig = null;
	public methods:IntegrationMethod[];

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
		this.simulationConfig = simulationService.simulationConfig;
		this.methods = simulationService.getIntegrationMethods();
	}

	newSimulation() {
		this.simulationService.reset();
	}

	openSimulation() {
		this.simulationService.open();
	}

	saveSimulation() {
		this.simulationService.save();
	}

	startSimulation() {
		this.simulationService.run();
	}

	rotateElement() {
		this.simulationService.rotateActiveElement();
	}

	removeElement() {
		this.simulationService.removeActiveElement();
	}
}
