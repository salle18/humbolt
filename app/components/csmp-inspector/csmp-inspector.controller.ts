import {Component, DoCheck} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import {SimulationService} from "../../core/services/SimulationService";

@Component({
	selector: "csmp-inspector",
	templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector implements DoCheck {

	private simulationService:SimulationService = null;
	public elements:Element[] = [];
	public activeElement:Element = null;

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
		this.elements = simulationService.getElements();
	}

	setActiveElement(element:Element):void {
		this.simulationService.setActiveElement(element);
	}

	doCheck() {
		this.activeElement = this.simulationService.activeElement;
	}

}
