import {Component} from "angular2/core";
import {SimulationService} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-configuration-table",
	templateUrl: "components/csmp-configuration-table/csmp-configuration-table.template.html"
})
export class CsmpConfigurationTable {

	constructor(private simulationService:SimulationService) {
	}
}
