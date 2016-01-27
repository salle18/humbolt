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
		let labels = ["time"].concat(this.simulationService.getBlocks().map(block => block.getIndexDescription()));
		let graphOptions = {
			labels: labels
		};
		if (data.length > 0) {
			let graph = new Dygraph(this.elementRef.nativeElement, data, graphOptions);
		}
	}

}
