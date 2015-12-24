// Material design lite global
import "google/material-design-lite";
import {Directive, ElementRef} from "angular2/angular2";

declare var componentHandler:any;

@Directive({
	selector: "[csmp-upgrade-block]"
})
export class CsmpUpgradeBlock {

	constructor(elementRef:ElementRef) {
		componentHandler.upgradeBlock(elementRef.nativeBlock);
	}
}
