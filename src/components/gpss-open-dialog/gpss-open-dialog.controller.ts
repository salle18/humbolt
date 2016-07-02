import {Component} from "@angular/core";
import {GpssAppService} from "../../core/services/GpssAppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {IGpssSimulation} from "../../gpss/interfaces/IGpssSimulation";


@Component({
    selector: "gpss-open-dialog",
    templateUrl: "components/gpss-open-dialog/gpss-open-dialog.template.html"
})
export class GpssOpenDialog {
    private simulations:IGpssSimulation[] = [];


    constructor(private gpssAppService:GpssAppService, private modalInstance:ModalInstance) {
        this.gpssAppService.listSimulations();
        this.simulations = this.gpssAppService.simulations;
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
