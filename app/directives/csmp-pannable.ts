import {Directive, ElementRef} from "angular2/angular2";

interface IPosition {
	top: number;
	left: number;
}

@Directive({
	selector: "[csmp-pannable]",
	host: {
		"(mousedown)": "start($event)",
		"(mouseup)": "stop($event)"
	}
})
export class CsmpPannable {

	private offset:IPosition;
	private mousePosition:IPosition;

	private element:JQuery;

	constructor(elementRef:ElementRef) {
		this.element = jQuery(elementRef.nativeElement);
	}

	start(e) {
		this.offset = this.element.offset();
		this.mousePosition = {
			top: e.pageY,
			left: e.pageX
		};
	}

	stop(e) {
		let newOffset = {
			top: this.offset.top + e.pageY - this.mousePosition.top,
			left: this.offset.left + e.pageX - this.mousePosition.left
		};
		this.element.offset(newOffset);
	}
}
