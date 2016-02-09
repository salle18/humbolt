import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {ModalProvider} from "../../modules/modal/ModalProvider";
import {GpssAppService} from "../../core/services/GpssAppService";
import {GpssOpenDialog} from "../gpss-open-dialog/gpss-open-dialog.controller";
import {GpssSaveDialog} from "../gpss-save-dialog/gpss-save-dialog.controller";

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
		this.modal.open(GpssOpenDialog, []);
	}

	saveDialog():void {
		this.modal.open(GpssSaveDialog, []);
	}

	run():void {
		this.gpssAppService.run();
	}

}
