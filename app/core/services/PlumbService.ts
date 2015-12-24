import {Injectable} from "angular2/angular2";
import "sporritt/jsPlumb";
import {SimulationService} from "./SimulationService";
import {Element, EmptyElement} from "../../csmp/Element";

declare let jsPlumb:any;

@Injectable()
export class PlumbService {

	private instance:JsPlumbInstance = null;
	private simulationService:SimulationService = null;

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
		jsPlumb.ready(() => {
			this.createInstance();
			this.bindEvents();
		});
	}

	createInstance():void {
		this.instance = jsPlumb.getInstance();
	}

	getInstance():JsPlumbInstance {
		return this.instance;
	}

	removeElement(key:string):void {
		this.instance.detachAllConnections(key, {
			fireEvent: false
		});
		this.instance.removeAllEndpoints(key);
		this.instance.detach(key);
	}

	removeAllElements() {
		this.simulationService.getElements().forEach((element:Element) => {
			this.removeElement(element.key);
		});
	}

	bindEvents():void {

		/**
		 * Sprečavamo da se element veže za samog sebe.
		 */
		this.instance.bind("beforeDrop", (info) => {
			return info.sourceId !== info.targetId;
		});

		this.instance.bind("connection", (info) => {
			let sourceElement:Element = this.simulationService.getElement(info.sourceId);
			let targetElement:Element = this.simulationService.getElement(info.targetId);
			let targetIndex = info.connection.getParameter("inputIndex");
			targetElement.inputs[targetIndex] = sourceElement;
			sourceElement.addOutput(targetIndex, targetElement);
		});

		this.instance.bind("connectionDetached", (info) => {
			let sourceElement:Element = this.simulationService.getElement(info.sourceId);
			let targetElement:Element = this.simulationService.getElement(info.targetId);
			let targetIndex = info.connection.getParameter("inputIndex");
			targetElement.inputs[targetIndex] = new EmptyElement();
			sourceElement.removeOutput(targetIndex, targetElement);
		});

		this.instance.bind("connectionMoved", (info) => {
			let sourceElement:Element = this.simulationService.getElement(info.originalSourceId);
			let targetElement:Element = this.simulationService.getElement(info.originalTargetId);
			let targetIndex = info.connection.getParameter("inputIndex");
			targetElement.inputs[targetIndex] = new EmptyElement();
			sourceElement.removeOutput(targetIndex, targetElement);
		});
	}

}
