import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {CsmpAppService} from "../../core/services/CsmpAppService";
import {CsmpOpenDialog} from "../csmp-open-dialog/csmp-open-dialog.controller";
import {CsmpSaveDialog} from "../csmp-save-dialog/csmp-save-dialog.controller";
import {CsmpRunDialog} from "../csmp-run-dialog/csmp-run-dialog.controller";
import {ModalService} from "../../modules/modal/ModalService";

@Component({
    selector: "csmp-menu",
    templateUrl: "components/csmp-menu/csmp-menu.template.html",
    directives: [CsmpUpgradeElement, RouterLink]
})
export class CsmpMenu {

    constructor(private appService:CsmpAppService, private modal:ModalService) {
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
