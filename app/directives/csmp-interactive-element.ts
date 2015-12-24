import {Directive, Input} from "angular2/angular2";
import {Element} from "../csmp/Element";
import {SimulationService} from "../core/services/SimulationService";
import {KeyEvent} from "../core/commons/KeyEvent";

@Directive({
	selector: "[csmp-interactive-element]",
	host: {
		"(click)": "onClick()",
		"(keydown)": "onKeyDown($event)"
	}
})
export class CsmpInteractiveElement {

	private simulationService:SimulationService;
	@Input() element:Element;

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
	}

	onClick() {
		this.simulationService.setActiveElement(this.element);
	}

	onKeyDown(e) {
		if (e.keyCode === KeyEvent.DOM_VK_DELETE) {
			this.simulationService.removeActiveElement();
		}
	}

}
