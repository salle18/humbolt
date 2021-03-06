import {Component, ElementRef, NgZone, OnInit, AfterViewInit} from "@angular/core";
import {Block} from "../../csmp/Block";
import {CsmpAppService, SimulationService, PlumbService, PlumbServiceUtilities} from "../../services";
import {CsmpBlock} from "../../components/csmp-block/csmp-block.controller";
import "jquery-ui/ui/droppable";
import {CsmpDraggable} from "../../directives/csmp-draggable";
import {CsmpEndpoints} from "../../directives/csmp-endpoints";
import {CsmpInteractiveBlock} from "../../directives/csmp-interactive-block";


@Component({
    selector: "csmp-canvas",
    templateUrl: "components/csmp-canvas/csmp-canvas.template.html",
    directives: [CsmpBlock, CsmpDraggable, CsmpEndpoints, CsmpInteractiveBlock]
})
export class CsmpCanvas implements OnInit, AfterViewInit {

    private blocks:Block[];

    constructor(private elementRef:ElementRef, private zone:NgZone, private appService:CsmpAppService, private simulationService:SimulationService,
                private plumbService:PlumbService, private plumbServiceUtilities:PlumbServiceUtilities) {
        this.blocks = simulationService.getBlocks();
    }

    ngOnInit():void {
        this.plumbService.reset();

        jQuery(this.elementRef.nativeElement).droppable({
            accept: ".block-list-item",
            drop: (event, ui) => {
                let className = ui.helper.attr("classname");
                let block:Block = this.appService.createBlock(className);
                let position = ui.helper.position();
                position.left = Math.round(position.left / 10) * 10;
                position.top = Math.round(position.top / 10) * 10;
                block.position = position;
                this.zone.run(() => {
                    this.simulationService.addBlock(block);
                    this.appService.setActiveBlock(block);
                });
            }
        });
    }

    ngAfterViewInit():void {
        setTimeout(() => {
            this.plumbService.resetConnections();
            this.plumbServiceUtilities.resetRotations();
        });//bugfix https://github.com/angular/angular/issues/6005
    }

}
