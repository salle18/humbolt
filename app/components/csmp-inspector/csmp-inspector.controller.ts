import {Component} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import {SimulationService} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-inspector",
	templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector {

	private simulationService: SimulationService = null;
	public elements: Element[] = [];
	public params: number[] = [];
	public stringParams: string[] = [];
	public inputs: Element[] = [];
	public outputs: Element[] = [];
	
	constructor(simulationService: SimulationService) {
		this.elements = simulationService.getElements();
	}

}
