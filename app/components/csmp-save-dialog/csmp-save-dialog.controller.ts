import {Component} from "angular2/core";
import {CsmpAppService} from "../../core/services/CsmpAppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {SimulationService} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-save-dialog",
	templateUrl: "components/csmp-save-dialog/csmp-save-dialog.template.html"
})
export class CsmpSaveDialog {
	private localFile:string;
	private filename:string;

	constructor(private appService:CsmpAppService, private simulationService:SimulationService, private modalInstance:ModalInstance) {
		this.filename = this.simulationService.getSimulationConfig().description + this.appService.extension.simulation;
		this.localFile = this.appService.createLocalFile(this.simulationService.saveJSON());
	}

	save():void {
		this.appService.save();
		this.modalInstance.close();
	}


	close():void {
		this.modalInstance.close();
	}
}
