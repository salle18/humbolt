import {Component} from "@angular/core";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {GpssAppService} from "../../core/services/GpssAppService";
import {IGpssSimulation} from "../../gpss/interfaces/IGpssSimulation";

@Component({
    selector: "gpss-save-dialog",
    templateUrl: "components/gpss-save-dialog/gpss-save-dialog.template.html"
})
export class GpssSaveDialog {

    private simulation:IGpssSimulation;

    constructor(private gpssAppService:GpssAppService, private modalInstance:ModalInstance) {
        this.simulation = gpssAppService.getSimulation();
    }

    save():void {
        this.gpssAppService.save();
        this.modalInstance.close();
    }

    close():void {
        this.modalInstance.close();
    }
}
