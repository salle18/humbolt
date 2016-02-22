// Material design lite global
import "google/material-design-lite";
import {Directive, ElementRef, OnInit} from "angular2/core";

declare var componentHandler:any;

@Directive({
    selector: "[csmp-upgrade-element]"
})
export class CsmpUpgradeElement implements OnInit {

    constructor(private elementRef:ElementRef) {
    }

    ngOnInit():void {
        componentHandler.upgradeElement(this.elementRef.nativeElement);
    }
}
