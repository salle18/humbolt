import {Component, DoCheck} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {SimulationService} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";
import {IMetaJSONMethod, ISimulationConfig} from "../../csmp/Simulation";
import {CsmpDialog} from "../csmp-dialog/csmp-dialog.controller";

@Component({
	selector: "csmp-menu",
	templateUrl: "components/csmp-menu/csmp-menu.template.html",
	directives: [CsmpUpgradeElement, CsmpDialog, RouterLink]
})
export class CsmpMenu implements DoCheck {

	public simulationConfig:ISimulationConfig;
	public methods:IMetaJSONMethod[] = [];
	private showDialog:boolean = false;

	constructor(private appService:AppService, private simulationService:SimulationService) {
		this.simulationConfig = simulationService.getSimulationConfig();
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

	ngDoCheck() {
		if (!this.methods.length) {
			this.methods = this.appService.getIntegrationMethods();
		}
	}
}
