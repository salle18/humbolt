import {Component} from "angular2/angular2";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {SimulationService} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";
import {IMetaJSONMethod, ISimulationConfig} from "../../csmp/Simulation";

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
		this.simulationConfig = simulationService.getSimulationConfig();
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

	runSimulation() {
		this.appService.run(this.simulationConfig);
	}

	rotateBlock(direction:string) {
		this.appService.rotateActiveBlock(direction);
	}

	removeBlock() {
		this.appService.removeActiveBlock();
	}
}
