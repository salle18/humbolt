import {Component, ElementRef, NgZone} from "angular2/angular2";
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
export class CsmpCanvas {

	private blocks:Block[];
	private zone:NgZone;

	constructor(elementRef:ElementRef, zone:NgZone, appService:AppService, simulationService:SimulationService) {

		this.blocks = simulationService.getBlocks();
		this.zone = zone;

		jQuery(elementRef.nativeElement).droppable({
			accept: ":not(.csmp-canvas-block)",
			drop: (event, ui) => {
				let className = ui.helper.attr("classname");
				let block:Block = appService.createBlock(className);
				block.position = ui.helper.position();
				zone.run(() => {
					simulationService.addBlock(block);
					appService.setActiveBlock(block);
				});
			}
		});
	}

}
