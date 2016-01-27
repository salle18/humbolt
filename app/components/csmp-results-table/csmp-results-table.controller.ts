import {Component} from "angular2/core";
import {SimulationService} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-results-table",
	templateUrl: "components/csmp-results-table/csmp-results-table.template.html"
})
export class CsmpResultsTable {

	constructor(private simulationService:SimulationService) {
		console.log(this.simulationService.getSimulationResults());
	}
}
