import {Component} from "angular2/core";
import {IJSONSimulation} from "../../csmp/Simulation";
import {AppService} from "../../core/services/AppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";

@Component({
	selector: "csmp-open-dialog",
	templateUrl: "components/csmp-open-dialog/csmp-open-dialog.template.html"
})
export class CsmpOpenDialog {

	private simulations:IJSONSimulation[];

	constructor(private appService:AppService, private modalInstance:ModalInstance) {
		this.appService.listSimulations();
		this.simulations = this.appService.simulations;
	}

	removeSimulation(id:string):void {
		this.appService.removeSimulation(id);
	}

	openSimulation(id:string):void {
		this.appService.reset();
		this.appService.loadSimulation(id);
	}

	close():void {
		this.modalInstance.close();
	}
}
