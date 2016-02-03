import {Component} from "angular2/core";
import {IJSONSimulation} from "../../csmp/Simulation";
import {AppService} from "../../core/services/AppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";

@Component({
	selector: "csmp-dialog",
	templateUrl: "components/csmp-dialog/csmp-dialog.template.html"
})
export class CsmpDialog {

	private simulations:IJSONSimulation[];

	constructor(private appService:AppService, private modalInstance:ModalInstance) {
		this.simulations = this.appService.simulations;
	}

	removeSimulation(id:string):void {
		this.appService.removeSimulation(id);
	}

	close():void {
		this.modalInstance.close();
	}
}
