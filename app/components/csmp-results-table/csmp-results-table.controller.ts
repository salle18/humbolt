import {Component} from "angular2/core";
import {SimulationService, ISimulationFilter} from "../../core/services/SimulationService";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";

@Component({
	selector: "csmp-results-table",
	templateUrl: "components/csmp-results-table/csmp-results-table.template.html",
	directives: [CsmpUpgradeElement]
})
export class CsmpResultsTable {

	private filters:ISimulationFilter[] = [];
	private simulationResults:number[][] = [];
	private results:number[][] = [];
	private TOTAL_ROWS:number = 0;
	private NUMBER_OF_VISIBLE_ROWS:number = 100;

	constructor(private simulationService:SimulationService) {
		this.simulationService.initFilters();
		this.filters = this.simulationService.getSimulationFilters();
		this.simulationResults = this.simulationService.getSimulationResults();
		this.TOTAL_ROWS = this.simulationResults.length;
		this.results = this.simulationResults.slice(0, this.NUMBER_OF_VISIBLE_ROWS);
	}

	filterResults(index:number):void {
		index = +index;
		let maxIndex = this.TOTAL_ROWS - this.NUMBER_OF_VISIBLE_ROWS;
		if (index > maxIndex) {
			index = maxIndex;
		}
		this.results = this.simulationResults.slice(index, index + this.NUMBER_OF_VISIBLE_ROWS);
	}
}
