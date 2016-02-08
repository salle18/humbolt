import {Component} from "angular2/core";
import {AppService} from "../../core/services/AppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {SimulationService} from "../../core/services/SimulationService";
import {ISimulationConfig} from "../../csmp/interfaces/ISimulationConfig";

@Component({
	selector: "csmp-save-dialog",
	templateUrl: "components/csmp-save-dialog/csmp-save-dialog.template.html"
})
export class CsmpSaveDialog {

	private config:ISimulationConfig;

	constructor(private appService:AppService, private simulationService:SimulationService, private modalInstance:ModalInstance) {
		this.config = this.simulationService.getSimulationConfig();
	}

	save():void {
		this.appService.save();
		this.modalInstance.close();
	}

	close():void {
		this.modalInstance.close();
	}
}
