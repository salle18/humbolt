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
	private mousePosition:IPosition;

	constructor(private elementRef:ElementRef) {
	}

	onMouseDown(e:MouseEvent) {
		this.mousePosition = {
			top: e.pageY,
			left: e.pageX
		};
	}

	onMouseUp(e:MouseEvent) {
		let offset = {
			top: this.mousePosition.top - e.pageY,
			left: this.mousePosition.left - e.pageX
		};
		this.elementRef.nativeElement.scrollTop = offset.top;
		this.elementRef.nativeElement.scrollLeft = offset.left;
	}
}
