import {Component, ElementRef} from "angular2/angular2";
import "jquery-ui/ui/droppable";

@Component({
	selector: "csmp-canvas",
	templateUrl: "components/csmp-canvas/csmp-canvas.template.html"
})
export class CsmpCanvas {

	constructor(elementRef:ElementRef) {
		let nativeElement = elementRef.nativeElement;

		jQuery(nativeElement).droppable({
			accept: ":not(.csmp-canvas-element)",
			drop: (event, ui) => {
				let node = ui.helper.clone();
				node.addClass("csmp-canvas-element");
				nativeElement.appendChild(node[0]);
				let className = node.attr("className");
				node.draggable({
					containment: "parent"
				});
			}
		});
	}

}
