import {Component, ElementRef, NgFor, NgZone} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import * as ElementDefinitions from "../../csmp/ElementDefinitions";
import {SimulationService} from "../../core/services/SimulationService";
import {CsmpElement} from "../../components/csmp-element/csmp-element.controller";
import "jquery-ui/ui/droppable";
import {CsmpDraggable} from "../../directives/csmp-draggable";
import {CsmpEndpoints} from "../../directives/csmp-endpoints";


@Component({
	selector: "csmp-canvas",
	templateUrl: "components/csmp-canvas/csmp-canvas.template.html",
	directives: [NgFor, CsmpElement, CsmpDraggable, CsmpEndpoints]
})
export class CsmpCanvas {

	private elements:Element[];
	private zone:NgZone;

	constructor(elementRef:ElementRef, zone:NgZone, SimulationService:SimulationService) {

		this.elements = SimulationService.getElements();
		this.zone = zone;

		jQuery(elementRef.nativeElement).droppable({
			accept: ":not(.csmp-canvas-element)",
			drop: (event, ui) => {
				let className = ui.helper.attr("classname");
				let element:Element = new ElementDefinitions[className];
				element.position = ui.helper.position();
				zone.run(() => {
					SimulationService.addElement(element);
				});
			}
		});
	}

}
