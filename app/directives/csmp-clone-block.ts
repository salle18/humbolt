import {Directive, ElementRef, NgZone} from "angular2/core";
import "jquery-ui/ui/draggable";


@Directive({
    selector: "[csmp-clone-block]"
})
export class CsmpCloneBlock {

    constructor(private elementRef:ElementRef, private zone:NgZone) {
        zone.runOutsideAngular(() => {
            jQuery(elementRef.nativeElement).draggable({
                revert: "invalid",
                helper: "clone",
                appendTo: "csmp-canvas",
                containment: "app"
            });
        });
    }
}
