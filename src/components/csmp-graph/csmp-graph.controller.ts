import {Component, ElementRef, OnInit} from "@angular/core";
import {SimulationService} from "../../services";
import {HumboltMessageBox} from "../humbolt-message-box/humbolt-message-box.controller";
var Dygraph = require("danvk/dygraphs");

@Component({
    selector: "csmp-graph",
    templateUrl: "components/csmp-graph/csmp-graph.template.html",
    directives: [HumboltMessageBox]
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
			valueFormatter: n => n
        };

        if (data.length > 0 && data[0].length > 1) {
            let graph = new Dygraph(this.elementRef.nativeElement, data, graphOptions);
        }
    }

}
