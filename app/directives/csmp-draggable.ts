import {Directive, ElementRef} from "angular2/angular2";
import {PlumbService} from "../core/services/PlumbService";

@Directive({
	selector: "[csmp-draggable]"
})
export class CsmpDraggable {

	constructor(elementRef:ElementRef, plumbService:PlumbService) {
		plumbService.draggable(elementRef.nativeElement);
	}
}
