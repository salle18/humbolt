import {Component} from "angular2/core";
import {CsmpAppService} from "../../core/services/CsmpAppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {IJSONSimulation} from "../../csmp/interfaces/IJSONSimulation";

@Component({
	selector: "csmp-open-dialog",
	templateUrl: "components/csmp-open-dialog/csmp-open-dialog.template.html"
})
export class CsmpOpenDialog {

	private simulations:IJSONSimulation[];

	constructor(private appService:CsmpAppService, private modalInstance:ModalInstance) {
		this.appService.listSimulations();
		this.simulations = this.appService.simulations;
	}

	removeSimulation(id:string):void {
		this.appService.removeSimulation(id);
	}

	openSimulation(id:string):void {
		this.appService.reset();
		this.appService.loadSimulation(id);
		this.modalInstance.close();
	}

	close():void {
		this.modalInstance.close();
	}
}
