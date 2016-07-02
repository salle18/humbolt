import {Component} from "@angular/core";
import {SimulationService} from "../../core/services/SimulationService";
import {Block} from "../../csmp/Block";
import {HumboltMessageBox} from "../humbolt-message-box/humbolt-message-box.controller";

@Component({
    selector: "csmp-configuration-table",
    templateUrl: "components/csmp-configuration-table/csmp-configuration-table.template.html",
    directives: [HumboltMessageBox]
})
export class CsmpConfigurationTable {

    private blocks:Block[];

    constructor(private simulationService:SimulationService) {
        this.blocks = this.simulationService.getBlocks();
    }
}
