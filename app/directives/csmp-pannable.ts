import {Directive, ElementRef} from "angular2/core";

interface IPosition {
	top: number;
	left: number;
}

@Directive({
	selector: "[csmp-pannable]",
	host: {
		"(mousedown)": "onMouseDown($event)",
		"(mouseup)": "onMouseUp($event)"
	}
})
export class CsmpPannable {

	private offset:IPosition;
	private mousePosition:IPosition;

	private element:JQuery;

	constructor(elementRef:ElementRef) {
		this.element = jQuery(elementRef.nativeElement);
	}

	onMouseDown(e) {
		this.offset = this.element.offset();
		this.mousePosition = {
			top: e.pageY,
			left: e.pageX
		};
	}

	onMouseUp(e) {
		let newOffset = {
			top: this.offset.top + e.pageY - this.mousePosition.top,
			left: this.offset.left + e.pageX - this.mousePosition.left
		};
		this.element.offset(newOffset);
	}
}
