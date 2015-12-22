import {Component, ElementRef} from "angular2/angular2";
import {KeyEvent} from "../../core/commons/KeyEvent";
import {Element, IPosition} from "../../csmp/Element";
import * as ElementDefinitions from "../../csmp/ElementDefinitions";
import {CsmpElement} from "../../components/csmp-element/csmp-element.controller";
import "jquery-ui/ui/droppable";


@Component({
	selector: "csmp-canvas",
	templateUrl: "components/csmp-canvas/csmp-canvas.template.html"
})
export class CsmpCanvas {

	private nativeElement:HTMLElement;

	constructor(elementRef:ElementRef) {

		this.nativeElement = elementRef.nativeElement;

		jQuery(this.nativeElement).droppable({
			accept: ":not(.csmp-canvas-element)",
			drop: (event, ui) => {
				//todo uzimanje naziva klase iz elementa
				let className = ui.helper.find("div").attr("classname");
				let element:Element = new ElementDefinitions[className];
				element.position = ui.helper.position();
				this.addCanvasElement(element);
			}
		});
	}

	addCanvasElement(element:Element):void {
		//todo kreiranje novog elementa iz direktive csmp-element a ne na silu ovako
		let node = jQuery("<div>").addClass("csmp-canvas-element mdl-button mdl-button--primary mdl-button--raised");
		node.text(element.getSign());
		node.css('position', 'absolute').css(element.position);
		jQuery(this.nativeElement).append(node);

		node.draggable({
			containment: "parent"
		});

		node.on("mousedown", () => {
			//set active element

		});

		node.on("keydown", (e) => {
			if (e.keyCode === KeyEvent.DOM_VK_DELETE) {
				//remove element

			}
		});
	}

}
