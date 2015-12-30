import {Component, DoCheck} from "angular2/angular2";
import {Block} from "../../csmp/Block";
import {SimulationService} from "../../core/services/SimulationService";
import {AppService} from "../../core/services/AppService";

interface IValueNumber {
	value: number;
}

interface IValueString {
	value: string;
}

@Component({
	selector: "csmp-inspector",
	templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector implements DoCheck {

	private appService:AppService = null;
	private simulationService:SimulationService = null;
	public blocks:Block[] = [];
	public activeBlock:Block = null;
	public params:IValueNumber[] = [];
	public stringParams:IValueString[] = [];

	constructor(appService:AppService, simulationService:SimulationService) {
		this.appService = appService;
		this.simulationService = simulationService;
		this.blocks = simulationService.getBlocks();
	}

	setActiveBlock(block:Block):void {
		this.appService.setActiveBlock(block);
	}

	setActiveBlockParam(i, value) {
		this.params[i].value = value;
		this.activeBlock.params[i] = value;
	}

	setActiveBlockStringParam(i, value) {
		this.stringParams[i].value = value;
		this.activeBlock.stringParams[i] = value;
	}

	doCheck():void {
		this.activeBlock = this.appService.activeBlock;
		if (this.activeBlock) {
			this.params = this.activeBlock.params.map(item => {
				return {
					value: item
				};
			});
			this.stringParams = this.activeBlock.stringParams.map(item => {
				return {
					value: item
				};
			});
		} else {
			this.params = [];
			this.stringParams = [];
		}
	}

}
