import {Directive, ElementRef} from "angular2/angular2";

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

	private block:JQuery;

	constructor(elementRef:ElementRef) {
		this.block = jQuery(elementRef.nativeBlock);
	}

	onMouseDown(e) {
		this.offset = this.block.offset();
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
		this.block.offset(newOffset);
	}
}
