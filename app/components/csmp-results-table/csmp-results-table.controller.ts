import {Component} from "angular2/core";
import {SimulationService, ISimulationFilter} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-results-table",
	templateUrl: "components/csmp-results-table/csmp-results-table.template.html"
})
export class CsmpResultsTable {

	private filters:ISimulationFilter[] = [];
	private simulationResults:number[][] = [];
	private results:number[][] = [];
	private NUMBER_OF_ROWS:number = 100;

	constructor(private simulationService:SimulationService) {
		this.simulationService.initFilters();
		this.filters = this.simulationService.getSimulationFilters();
		this.simulationResults = this.simulationService.getSimulationResults();
		this.filterResults(0);
	}

	filterResults(index:number) {
		let maxIndex = this.simulationResults.length - this.NUMBER_OF_ROWS;
		if (index > maxIndex) {
			index = maxIndex;
		}
		this.results = this.simulationResults.slice(index, index + this.NUMBER_OF_ROWS);
	}
}
