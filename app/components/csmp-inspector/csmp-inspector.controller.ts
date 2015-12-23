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

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
		this.elements = simulationService.getElements();
	}
	
	getActiveElement(): Element {
		return this.simulationService.activeElement;
	}
	
	setActiveElement(element: Element): void {
		this.simulationService.activeElement = element;
	}

}
