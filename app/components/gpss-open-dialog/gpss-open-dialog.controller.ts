import {Component} from "angular2/core";
import {GpssAppService} from "../../core/services/GpssAppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";


@Component({
	selector: "gpss-open-dialog",
	templateUrl: "components/gpss-open-dialog/gpss-open-dialog.template.html"
})
export class GpssOpenDialog {


	constructor(private gpssAppService:GpssAppService, private modalInstance:ModalInstance) {

	}

	removeSimulation(id:string):void {
		this.gpssAppService.removeSimulation(id);
	}

	openSimulation(id:string):void {
		this.gpssAppService.loadSimulation(id);
		this.modalInstance.close();
	}

	close():void {
		this.modalInstance.close();
	}
}
