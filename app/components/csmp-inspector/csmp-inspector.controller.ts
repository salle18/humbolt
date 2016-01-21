import {Component, DoCheck} from "angular2/angular2";
import {Block, IParam} from "../../csmp/Block";
import {SimulationService} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";

@Component({
	selector: "csmp-inspector",
	templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector implements DoCheck {

	private appService:AppService = null;
	private simulationService:SimulationService = null;
	public blocks:Block[] = [];
	public activeBlock:Block = null;
	public params:IParam<number>[] = [];
	public stringParams:IParam<string>[] = [];

	constructor(appService:AppService, simulationService:SimulationService) {
		this.appService = appService;
		this.simulationService = simulationService;
		this.blocks = simulationService.getBlocks();
	}

	setActiveBlock(block:Block):void {
		this.appService.setActiveBlock(block);
	}

	doCheck() {
		this.activeBlock = this.appService.activeBlock;
	}

}
