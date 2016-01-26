import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {SimulationService} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";
import {IMetaJSONMethod, ISimulationConfig} from "../../csmp/Simulation";
import {CsmpDialog} from "../csmp-dialog/csmp-dialog.controller";
import {IJSONSimulation} from "../../csmp/Simulation";

@Component({
	selector: "csmp-menu",
	templateUrl: "components/csmp-menu/csmp-menu.template.html",
	directives: [CsmpUpgradeElement, CsmpDialog, RouterLink]
})
export class CsmpMenu {

	public simulationConfig:ISimulationConfig;
	public methods:IMetaJSONMethod[] = [];
	private dialog = {
		visible: false
	};

	constructor(private appService:AppService, private simulationService:SimulationService) {
		this.simulationConfig = simulationService.getSimulationConfig();
		this.methods = this.appService.integrationMethods;
	}

	newSimulation():void {
		this.appService.reset();
	}

	openDialog():void {
		this.appService.listSimulations();
		this.dialog.visible = true;
	}

	saveSimulation():void {
		this.appService.save();
	}

	runSimulation():void {
		this.appService.run(this.simulationConfig);
	}

	rotateBlock(direction:string):void {
		this.appService.rotateActiveBlock(direction);
	}

	removeBlock():void {
		this.appService.removeActiveBlock();
	}

}
