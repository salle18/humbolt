import {Directive, ElementRef} from "angular2/angular2";
import "jquery-ui/ui/draggable";


@Directive({
	selector: "[csmp-clone-element]"
})
export class CsmpCloneElement {

	constructor(elementRef:ElementRef) {

		console.log(elementRef.nativeElement);
		
		jQuery(elementRef.nativeElement).draggable({
			revert: "invalid",
			helper: "clone",
			appendTo: "csmp-canvas",
			containment: "csmp-canvas"
		});
	}
}
