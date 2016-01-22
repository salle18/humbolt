// Material design lite global
import "google/material-design-lite";
import {Directive, ElementRef} from "angular2/core";

declare var componentHandler:any;

@Directive({
	selector: "[csmp-upgrade-element]"
})
export class CsmpUpgradeElement {

	constructor(elementRef:ElementRef) {
		componentHandler.upgradeElement(elementRef.nativeElement);
	}
}
