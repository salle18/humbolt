import {Component, ElementRef, OnInit} from "angular2/core";
import * as Dygraph from "dygraphs";
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
		let graph = new Dygraph(this.elementRef.nativeElement, this.simulationService.getSimulationResults());
	}

}
