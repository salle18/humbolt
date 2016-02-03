import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {AppService} from "../../core/services/AppService";
import {CsmpOpenDialog} from "../csmp-open-dialog/csmp-open-dialog.controller";
import {CsmpSaveDialog} from "../csmp-save-dialog/csmp-save-dialog.controller";
import {CsmpRunDialog} from "../csmp-run-dialog/csmp-run-dialog.controller";
import {ModalProvider} from "../../modules/modal/ModalProvider";

@Component({
	selector: "csmp-menu",
	templateUrl: "components/csmp-menu/csmp-menu.template.html",
	directives: [CsmpUpgradeElement, RouterLink],
	providers: [ModalProvider]
})
export class CsmpMenu {

	constructor(private appService:AppService, private modal:ModalProvider) {
	}

	newSimulation():void {
		this.appService.reset();
	}

	openDialog():void {
		this.modal.open(CsmpOpenDialog, []);
	}

	saveDialog():void {
		this.modal.open(CsmpSaveDialog, []);
	}

	runDialog():void {
		this.modal.open(CsmpRunDialog, []);
	}

	rotateBlock(direction:string):void {
		this.appService.rotateActiveBlock(direction);
	}

	removeBlock():void {
		this.appService.removeActiveBlock();
	}

}
