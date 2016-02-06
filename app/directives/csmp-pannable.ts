import {Directive, ElementRef} from "angular2/core";

@Directive({
	selector: "[csmp-pannable]",
	host: {
		"(mousedown)": "onMouseDown($event)",
		"(document:mouseup)": "onMouseUp($event)",
		"(document:mousemove)": "onMouseMove($event)",
		style: "cursor:-webkit-grab"
	}
})
export class CsmpPannable {
	private top:number = 0;
	private left:number = 0;
	private panning:boolean = false;
	private element:any;

	constructor(private elementRef:ElementRef) {
		this.element = elementRef.nativeElement;
	}

	onMouseDown(e:MouseEvent) {
		if (this.element.children[0] === e.target) {
			this.top = e.pageY;
			this.left = e.pageX;
			this.panning = true;
			this.element.style.cursor = "-webkit-grabbing";
		}
	}

	onMouseMove(e:MouseEvent) {
		if (this.panning) {
			let scrollTop = this.element.scrollTop + this.top - e.pageY;
			let scrollLeft = this.element.scrollLeft + this.left - e.pageX;
			this.element.scrollTop = scrollTop < 0 ? 0 : scrollTop > this.element.scrollHeight ? this.element.scrollHeight : scrollTop;
			this.element.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft > this.element.scrollWidth ? this.element.scrollWidth : scrollLeft;
			this.top = e.pageY;
			this.left = e.pageX;
		}
	}

	onMouseUp(e:MouseEvent) {
		this.panning = false;
		this.element.style.cursor = "-webkit-grab";
	}
}
