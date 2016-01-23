import {Component, ElementRef, NgZone, OnInit} from "angular2/core";
import {Block} from "../../csmp/Block";
import {SimulationService} from "../../core/services/SimulationService";
import {CsmpBlock} from "../../components/csmp-block/csmp-block.controller";
import "jquery-ui/ui/droppable";
import {CsmpDraggable} from "../../directives/csmp-draggable";
import {CsmpEndpoints} from "../../directives/csmp-endpoints";
import {CsmpInteractiveBlock} from "../../directives/csmp-interactive-block";
import {AppService} from "../../core/services/AppService";


@Component({
	selector: "csmp-canvas",
	templateUrl: "components/csmp-canvas/csmp-canvas.template.html",
	directives: [CsmpBlock, CsmpDraggable, CsmpEndpoints, CsmpInteractiveBlock]
})
export class CsmpCanvas implements OnInit {

	private blocks:Block[];
	private zone:NgZone;
	private elementRef:ElementRef;
	private appService:AppService;
	private simulationService:SimulationService;

	constructor(elementRef:ElementRef, zone:NgZone, appService:AppService, simulationService:SimulationService) {
		this.appService = appService;
		this.simulationService = simulationService;
		this.elementRef = elementRef;
		this.blocks = simulationService.getBlocks();
		this.zone = zone;
	}

	ngOnInit():void {
		jQuery(this.elementRef.nativeElement).droppable({
			accept: ":not(.csmp-canvas-block)",
			drop: (event, ui) => {
				let className = ui.helper.attr("classname");
				let block:Block = this.appService.createBlock(className);
				block.position = ui.helper.position();
				this.zone.run(() => {
					this.simulationService.addBlock(block);
					this.appService.setActiveBlock(block);
				});
			}
		});
	}


}
