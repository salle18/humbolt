import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {ModalProvider} from "../../modules/modal/ModalProvider";

@Component({
	selector: "gpss-menu",
	templateUrl: "components/gpss-menu/gpss-menu.template.html",
	directives: [CsmpUpgradeElement, RouterLink],
	providers: [ModalProvider]
})
export class GpssMenu {

	constructor(private modal:ModalProvider) {
	}

	newSimulation():void {
		console.log("new simulation");
		//this.appService.reset();
	}

	openDialog():void {
		console.log("open simulation dialog");
		//this.modal.open(CsmpOpenDialog, []);
	}

	saveDialog():void {
		console.log("open save dialog");
		//this.modal.open(CsmpSaveDialog, []);
	}

	run():void {
		console.log("run simulation");
	}

}
