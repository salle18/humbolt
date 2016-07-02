import {Component} from "@angular/core";
import {CsmpAppService} from "../../core/services/CsmpAppService";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {SimulationService} from "../../core/services/SimulationService";
import {ISimulationConfig} from "../../csmp/interfaces/ISimulationConfig";

@Component({
    selector: "csmp-save-dialog",
    templateUrl: "components/csmp-save-dialog/csmp-save-dialog.template.html"
})
export class CsmpSaveDialog {
    private localFile:string;
    private config:ISimulationConfig;

    constructor(private appService:CsmpAppService, private simulationService:SimulationService, private modalInstance:ModalInstance) {
        this.config = this.simulationService.getSimulationConfig();
    }

    save():void {
        this.appService.save();
        this.modalInstance.close();
    }

    saveLocalFile():void {
        let filename = this.config.description + this.appService.extension.simulation;
        this.appService.createLocalFile(this.simulationService.saveJSON(), filename);
    }


    close():void {
        this.modalInstance.close();
    }
}
