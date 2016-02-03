import {Component} from "angular2/core";
import {IJSONSimulation} from "../../csmp/Simulation";
import {AppService} from "../../core/services/AppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";

@Component({
	selector: "csmp-save-dialog",
	templateUrl: "components/csmp-save-dialog/csmp-save-dialog.template.html"
})
export class CsmpSaveDialog {

	constructor(private appService:AppService, private modalInstance:ModalInstance) {
		
	}


	close():void {
		this.modalInstance.close();
	}
}
