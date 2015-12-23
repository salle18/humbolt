import {Component} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import {SimulationService} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-inspector",
	templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector {

	private simulationService:SimulationService = null;
	public elements:Element[] = [];
	public params:number[] = [];
	public stringParams:string[] = [];
	public inputs:Element[] = [];
	public outputs:Element[] = [];

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
		this.elements = simulationService.getElements();
	}

	getActiveElementDescription() {
		if (this.simulationService.activeElement) {
			return this.simulationService.activeElement.getDescription();
		}
		return "CSMP Inspektor";
	}

}
