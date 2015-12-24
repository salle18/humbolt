import {Component, DoCheck} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import {SimulationService} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-inspector",
	templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector implements DoCheck {

	private appService:AppService = null;
	private simulationService:SimulationService = null;
	public elements:Element[] = [];
	public activeElement:Element = null;

	constructor(appService:AppService, simulationService:SimulationService) {
		this.appService = appService;
		this.simulationService = simulationService;
		this.elements = simulationService.getElements();
	}

	setActiveElement(element:Element):void {
		this.appService.setActiveElement(element);
	}

	doCheck() {
		this.activeElement = this.appService.activeElement;
	}

}
