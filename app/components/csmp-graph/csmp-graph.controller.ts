import {Component, ElementRef, OnInit} from "angular2/core";
import * as Dygraph from "danvk/dygraphs";
import {SimulationService} from "../../core/services/SimulationService";

declare var Dygraph:any;

@Component({
	selector: "csmp-graph",
	templateUrl: "components/csmp-graph/csmp-graph.template.html"
})
export class CsmpGraph implements OnInit {

	constructor(private elementRef:ElementRef, private simulationService:SimulationService) {

	}

	ngOnInit():void {
		let data = this.simulationService.getSimulationResults();
		let labels = this.simulationService.getLabels();
		let graphOptions = {
			labels: labels,
			width: 1200,
			height: 1000,
		};
		console.log(data);
		if (data.length > 0) {
			let graph = new Dygraph(this.elementRef.nativeElement, data, graphOptions);
		}
	}

}
