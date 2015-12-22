import {Component} from "angular2/angular2";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";

@Component({
	selector: "csmp-menu",
	templateUrl: "components/csmp-menu/csmp-menu.template.html",
	directives: [CsmpUpgradeElement]
})
export class CsmpMenu {

	newSimulation() {
		console.log("NEW");
	}

	openSimulation() {
		console.log("OPEN");
	}

	saveSimulation() {
		console.log("SAVE");
	}

	startSimulation() {
		console.log("START");
	}

}
