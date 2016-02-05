import {Directive, ElementRef, OnInit} from "angular2/core";
var ace = require("ace");
require("ace/theme-monokai");


@Directive({
	selector: "[humbolt-ace-editor]"
})
export class HumboltAceEditor implements OnInit {

	constructor(private elementRef:ElementRef) {
	}

	ngOnInit():void {
		let editor = ace.edit(this.elementRef.nativeElement);
		editor.setTheme("ace/theme/monokai");
		editor.focus();
	}
}
