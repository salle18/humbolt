import {Component} from "angular2/core";
import {IJSONSimulation} from "../../csmp/Simulation";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-dialog",
	templateUrl: "components/csmp-dialog/csmp-dialog.template.html"
})
export class CsmpDialog {

	private simulations:IJSONSimulation[];

	constructor(private appService:AppService) {
		this.simulations = this.appService.simulations;
	}

}
