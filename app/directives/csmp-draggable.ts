/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/jqueryui/jqueryui.d.ts"/>

import {Directive, ElementRef} from "angular2/angular2";
import "jqueryui/ui/draggable";


@Directive({
	selector: "[csmp-draggable]"
})
export class CsmpDraggable {

	constructor(elementRef:ElementRef) {

		jQuery(elementRef.nativeElement).draggable({
			revert: "invalid",
			helper: "clone",
			zIndex: 999
		});
	}
}
