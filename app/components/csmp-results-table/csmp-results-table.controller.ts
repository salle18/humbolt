import {Component} from "angular2/core";
import {SimulationService} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-results-table",
	templateUrl: "components/csmp-results-table/csmp-results-table.template.html"
})
export class CsmpResultsTable {
	
	private results: number[][];
	private labels: string[];

	constructor(private simulationService:SimulationService) {
		this.labels = this.simulationService.getLabels();
		this.results = this.simulationService.getSimulationResults();
	}
}
