import {Injectable} from "angular2/angular2";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {Element} from "../../csmp/Element";

@Injectable()
export class AppService {

	private simulationService:SimulationService = null;
	private plumbService:PlumbService = null;
	private plumbServiceUtilities:PlumbServiceUtilities = null;
	public activeElement:Element = null;


	constructor(simulationService:SimulationService, plumbService:PlumbService, plumbServiceUtilities:PlumbServiceUtilities) {
		this.simulationService = simulationService;
		this.plumbService = plumbService;
		this.plumbServiceUtilities = plumbServiceUtilities;
	}

	setActiveElement(element:Element):void {
		this.activeElement = element;
		this.simulationService.deactivateElements();
		element.active = true;
	}

	removeActiveElement():void {
		if (this.activeElement) {
			this.plumbService.removeElement(this.activeElement.key);
			this.simulationService.removeElement(this.activeElement.key);
			this.activeElement = null;
		}
	}

	rotateActiveElement(direction:string):void {
		if (this.activeElement) {
			this.plumbServiceUtilities.rotate(this.activeElement, direction);
		}
	}

	reest():void {
		this.plumbService.reset();
		this.simulationService.reset();
	}

}
