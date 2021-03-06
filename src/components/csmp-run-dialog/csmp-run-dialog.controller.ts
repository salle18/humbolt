import {Component} from "@angular/core";
import {CsmpAppService, SimulationService} from "../../services";
import {ModalInstance} from "../../modules/modal/ModalInstance";
import {IMetaJSONMethod} from "../../csmp/interfaces/IMetaJSONMethod";
import {ISimulationConfig} from "../../csmp/interfaces/ISimulationConfig";

@Component({
    selector: "csmp-save-dialog",
    templateUrl: "components/csmp-run-dialog/csmp-run-dialog.template.html"
})
export class CsmpRunDialog {

    private config:ISimulationConfig;
    private methods:IMetaJSONMethod[] = [];
    private isAsync:boolean;

    constructor(private appService:CsmpAppService, private simulationService:SimulationService, private modalInstance:ModalInstance) {
        this.config = this.simulationService.getSimulationConfig();
        this.methods = this.appService.integrationMethods;
        this.isAsync = this.simulationService.isAsync();
    }

    run():void {
        this.simulationService.initFilters();
        this.appService.run();
        this.modalInstance.close();
    }

    close():void {
        this.modalInstance.close();
    }
}
