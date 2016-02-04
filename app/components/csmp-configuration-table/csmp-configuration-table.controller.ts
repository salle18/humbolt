import {Component} from "angular2/core";
import {SimulationService} from "../../core/services/SimulationService";
import {Block} from "../../csmp/Block";

@Component({
	selector: "csmp-configuration-table",
	templateUrl: "components/csmp-configuration-table/csmp-configuration-table.template.html"
})
export class CsmpConfigurationTable {

	private blocks:Block[];

	constructor(private simulationService:SimulationService) {
		this.blocks = this.simulationService.getBlocks();
	}
}
