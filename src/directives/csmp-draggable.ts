import {Directive, Input, OnInit, NgZone, ElementRef} from "@angular/core";
import {PlumbService} from "../core/services/PlumbService";
import {Block} from "../csmp/Block";
import DraggableEventUIParams = JQueryUI.DraggableEventUIParams;

@Directive({
    selector: "[csmp-draggable]"
})
export class CsmpDraggable implements OnInit {

    @Input() block:Block;

    constructor(private plumbService:PlumbService, private zone:NgZone, private elementRef:ElementRef) {
    }

    /**
     * Poziva se prilikom inicijalizacije direktive.
     * Obavezno izvan angular konteksta jer nema izmene interfejsa.
     */
    ngOnInit() {
        this.zone.runOutsideAngular(() => {
            jQuery(this.elementRef.nativeElement).draggable({
                containment: "parent",
                grid: [10, 10],
                drag: (event:Event, ui:DraggableEventUIParams) => {
                    this.plumbService.getInstance().repaint(this.block.key, ui.position);
                },
                stop: (event:Event, ui:DraggableEventUIParams) => {
                    this.block.position.top = ui.position.top;
                    this.block.position.left = ui.position.left;
                }
            });
        });
    }

}
