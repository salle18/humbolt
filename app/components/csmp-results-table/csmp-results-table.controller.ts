import {Component} from "angular2/core";
import {SimulationService, ISimulationFilter} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-results-table",
	templateUrl: "components/csmp-results-table/csmp-results-table.template.html"
})
export class CsmpResultsTable {

	private filters:ISimulationFilter[];
	private results:number[][];

	constructor(private simulationService:SimulationService) {
		this.simulationService.initFilter();
		this.filters = this.simulationService.getSimulationFilters();
		this.results = this.simulationService.getSimulationResults();
	}
}
