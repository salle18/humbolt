import {Component} from "angular2/angular2";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {SimulationService, ISimulationConfig} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";
import {IMetaJSONMethod} from "../../csmp/Simulation";

@Component({
	selector: "csmp-menu",
	templateUrl: "components/csmp-menu/csmp-menu.template.html",
	directives: [CsmpUpgradeElement]
})
export class CsmpMenu {

	private appService:AppService = null;
	public simulationConfig:ISimulationConfig = null;
	public methods:IMetaJSONMethod[];

	constructor(appService:AppService, simulationService:SimulationService) {
		this.appService = appService;
		this.simulationConfig = simulationService.simulationConfig;
		appService.getIntegrationMethods().subscribe(methods => this.methods = methods);
	}

	newSimulation() {
		this.appService.reset();
	}

	openSimulation() {
		this.appService.open();
	}

	saveSimulation() {
		this.appService.save();
	}

	startSimulation() {
		this.appService.run();
	}

	rotateBlock(direction:string) {
		this.appService.rotateActiveBlock(direction);
	}

	removeBlock() {
		this.appService.removeActiveBlock();
	}
}
