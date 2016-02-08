import {Directive, ElementRef, OnInit} from "angular2/core";
import {GpssAppService} from "../core/services/GpssAppService";
var ace = require("ace");
require("ace/theme-monokai");


@Directive({
	selector: "[humbolt-ace-editor]"
})
export class HumboltAceEditor implements OnInit {

	constructor(private elementRef:ElementRef, private gpssAppService:GpssAppService) {
	}

	ngOnInit():void {
		let editor = ace.edit(this.elementRef.nativeElement);
		editor.setTheme("ace/theme/monokai");
		editor.focus();
		this.gpssAppService.setEditor(editor);
	}
}
