import {Component, ElementRef, OnInit} from "angular2/core";
import {SimulationService} from "../../core/services/SimulationService";
var Dygraph = require("danvk/dygraphs");

@Component({
	selector: "csmp-graph",
	templateUrl: "components/csmp-graph/csmp-graph.template.html"
})
export class CsmpGraph implements OnInit {

	constructor(private elementRef:ElementRef, private simulationService:SimulationService) {

	}

	ngOnInit():void {
		let data = this.simulationService.getFilteredSimulationResults();
		let labels = ["Vreme"].concat(this.simulationService.getFilteredLabels());
		let graphOptions = {
			labels: labels,
			legend: "always"
		};

		if (data.length > 0) {
			let graph = new Dygraph(this.elementRef.nativeElement, data, graphOptions);
		}
	}

}
