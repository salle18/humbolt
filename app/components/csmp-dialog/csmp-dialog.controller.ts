import {Component} from "angular2/core";
import {IJSONSimulation} from "../../csmp/Simulation";

@Component({
	selector: "csmp-dialog",
	templateUrl: "components/csmp-dialog/csmp-dialog.template.html"
})
export class CsmpDialog {
	
	private simulations:IJSONSimulation[] = [];

}
