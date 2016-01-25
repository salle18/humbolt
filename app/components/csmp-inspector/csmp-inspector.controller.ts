import {Component, DoCheck} from "angular2/core";
import {Block, IParam} from "../../csmp/Block";
import {SimulationService} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-inspector",
	templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector implements DoCheck {
	
	public blocks:Block[] = [];
	public activeBlock:Block = null;
	public params:IParam<number>[] = [];
	public stringParams:IParam<string>[] = [];

	constructor(private appService:AppService, private simulationService:SimulationService) {
		this.blocks = simulationService.getBlocks();
	}

	setActiveBlock(block:Block):void {
		this.appService.setActiveBlock(block);
	}

	ngDoCheck() {
		this.activeBlock = this.appService.activeBlock;
	}

}
