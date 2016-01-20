import {Injectable, Observable} from "angular2/angular2";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService} from "./ServerService";
import {Block, IMetaJSONBlock} from "../../csmp/Block";
import {Response} from "angular2/http";

@Injectable()
export class AppService {

	private simulationService:SimulationService = null;
	private plumbService:PlumbService = null;
	private plumbServiceUtilities:PlumbServiceUtilities = null;
	private serverService:ServerService = null;
	public activeBlock:Block = null;
	private blocks:Observable<Block[]>;
	private metaBlocks:IMetaJSONBlock[] = [];


	constructor(simulationService:SimulationService, plumbService:PlumbService, plumbServiceUtilities:PlumbServiceUtilities, serverService:ServerService) {
		this.simulationService = simulationService;
		this.plumbService = plumbService;
		this.plumbServiceUtilities = plumbServiceUtilities;
		this.serverService = serverService;
		this.loadMetaBlocks();
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
		this.serverService.postSimulate(JSON.stringify(this.simulationService.saveJSON()));
	}

	loadMetaBlocks():void {
		this.blocks = this.serverService.getMetaBlocks().map(metaBlocks => {
			this.metaBlocks = (metaBlocks as IMetaJSONBlock[]);
			let blocks = [];
			for (let i = 0; i < (metaBlocks as IMetaJSONBlock[]).length; i++) {
				blocks[i] = new Block();
				blocks[i].loadMetaJSON(metaBlocks[i]);
			}
			return blocks;
		});
	}

	getBlocks():Observable<Block[]> {
		return this.blocks;
	}

	createBlock(className:string):Block {
		for (let i = 0; i < this.metaBlocks.length; i++) {
			if (this.metaBlocks[i].className === className) {
				let block = new Block();
				block.loadMetaJSON(this.metaBlocks[i]);
				block.initialize();
				return block;
			}
		}
		return null;
	}

}
