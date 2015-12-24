import {Directive, ElementRef} from "angular2/angular2";
import "jquery-ui/ui/draggable";


@Directive({
	selector: "[csmp-clone-block]"
})
export class CsmpCloneBlock {

	constructor(elementRef:ElementRef) {

		jQuery(elementRef.nativeBlock).draggable({
			revert: "invalid",
			helper: "clone",
			appendTo: "csmp-canvas",
			containment: "app"
		});
	}
}
