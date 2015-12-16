import {Directive, ElementRef} from "angular2/angular2";

declare var componentHandler:any;

@Directive({
	selector: "[csmp-upgrade-element]"
})
export class CsmpUpgradeElement {

	constructor(elementRef:ElementRef) {
		componentHandler.upgradeElement(elementRef.nativeElement);
	}
}
