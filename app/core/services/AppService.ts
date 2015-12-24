import {Injectable} from "angular2/angular2";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {Block} from "../../csmp/Block";

@Injectable()
export class AppService {

	private simulationService:SimulationService = null;
	private plumbService:PlumbService = null;
	private plumbServiceUtilities:PlumbServiceUtilities = null;
	public activeBlock:Block = null;


	constructor(simulationService:SimulationService, plumbService:PlumbService, plumbServiceUtilities:PlumbServiceUtilities) {
		this.simulationService = simulationService;
		this.plumbService = plumbService;
		this.plumbServiceUtilities = plumbServiceUtilities;
	}

	setActiveBlock(block:Block):void {
		this.activeBlock = block;
		this.simulationService.deactivateBlocks();
		block.active = true;
	}

	removeActiveBlock():void {
		if (this.activeBlock) {
			this.plumbService.removeBlock(this.activeBlock.key);
			this.simulationService.removeBlock(this.activeBlock.key);
			this.activeBlock = null;
		}
	}

	rotateActiveBlock(direction:string):void {
		if (this.activeBlock) {
			this.plumbServiceUtilities.rotate(this.activeBlock, direction);
		}
	}

	reset():void {
		this.activeBlock = null;
		this.plumbService.reset();
		this.simulationService.reset();
	}

	open():void {
		console.log("OPEN");
	}

	save():void {
		console.log("SAVE");
	}

	run():void {
		this.simulationService.run();
	}

}
