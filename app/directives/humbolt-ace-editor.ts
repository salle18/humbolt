import {Directive, ElementRef, OnInit, Input} from "angular2/core";
import {GpssAppService} from "../core/services/GpssAppService";
var ace = require("ace");
require("ace/theme-monokai");


@Directive({
	selector: "[humbolt-ace-editor]"
})
export class HumboltAceEditor implements OnInit {

	@Input() readonly:string;

	constructor(private elementRef:ElementRef, private gpssAppService:GpssAppService) {
	}

	ngOnInit():void {
		let isReadonly = this.readonly === "true";
		let editor = ace.edit(this.elementRef.nativeElement);
		editor.setReadOnly(isReadonly);
		editor.$blockScrolling = Infinity;
		if (!isReadonly) {
			editor.setTheme("ace/theme/monokai");
			editor.focus();
		}
		this.gpssAppService.setEditor(editor, isReadonly);
	}
}
