import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {GpssAppService} from "../../core/services/GpssAppService";
import {GpssOpenDialog} from "../gpss-open-dialog/gpss-open-dialog.controller";
import {GpssSaveDialog} from "../gpss-save-dialog/gpss-save-dialog.controller";
import {ModalService} from "../../modules/modal/ModalService";

@Component({
    selector: "gpss-menu",
    templateUrl: "components/gpss-menu/gpss-menu.template.html",
    directives: [CsmpUpgradeElement, RouterLink]
})
export class GpssMenu {

    constructor(private modal:ModalService, private gpssAppService:GpssAppService) {
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
