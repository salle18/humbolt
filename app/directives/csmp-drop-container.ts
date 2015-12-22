import {Directive, ElementRef} from "angular2/angular2";
import "jquery-ui/ui/droppable";


@Directive({
	selector: "[csmp-drop-container]"
})
export class CsmpDropContainer {

	constructor(elementRef:ElementRef) {

		let nativeElement = elementRef.nativeElement;

		jQuery(nativeElement).droppable({
			accept: ":not(.drop-container-dropped)",
			drop: (event, ui) => {
				let node = ui.helper.clone();
				node.addClass("drop-container-dropped");
				nativeElement.appendChild(node[0]);
				let className = node.attr("className");
				node.draggable({
					containment: "parent"
				});
			}
		});


	}
}
