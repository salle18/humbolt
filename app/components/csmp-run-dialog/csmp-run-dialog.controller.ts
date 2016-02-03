import {Component} from "angular2/core";
import {AppService} from "../../core/services/AppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {SimulationService} from "../../core/services/SimulationService";
import {IMetaJSONMethod, ISimulationConfig} from "../../csmp/Simulation";
import {IJSONSimulation} from "../../csmp/Simulation";


@Component({
	selector: "csmp-save-dialog",
	templateUrl: "components/csmp-run-dialog/csmp-run-dialog.template.html"
})
export class CsmpRunDialog {

	private config:ISimulationConfig;
	private methods:IMetaJSONMethod[] = [];

	constructor(private appService:AppService, private simulationService:SimulationService, private modalInstance:ModalInstance) {
		this.config = this.simulationService.getSimulationConfig();
		this.methods = this.appService.integrationMethods;
	}

	run():void {
		this.appService.run();
	}

	close():void {
		this.modalInstance.close();
	}
}
