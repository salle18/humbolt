import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {ModalProvider} from "../../modules/modal/ModalProvider";
import {GpssAppService} from "../../core/services/GpssAppService";

@Component({
	selector: "gpss-menu",
	templateUrl: "components/gpss-menu/gpss-menu.template.html",
	directives: [CsmpUpgradeElement, RouterLink],
	providers: [ModalProvider]
})
export class GpssMenu {

	constructor(private modal:ModalProvider, private gpssAppService:GpssAppService) {
	}

	newSimulation():void {
		this.gpssAppService.reset();
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
