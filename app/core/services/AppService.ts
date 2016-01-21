import {Injectable, Observable} from "angular2/angular2";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService} from "./ServerService";
import {Block, IMetaJSONBlock} from "../../csmp/Block";
import {IMetaJSONMethod, ISimulationConfig} from "../../csmp/Simulation";
import {Response} from "angular2/http";

@Injectable()
export class AppService {

	private simulationService:SimulationService = null;
	private plumbService:PlumbService = null;
	private plumbServiceUtilities:PlumbServiceUtilities = null;
	private serverService:ServerService = null;
	public activeBlock:Block = null;
	private metaBlocks:Observable<IMetaJSONBlock[]>;
	private resolvedMetaBlocks:IMetaJSONBlock[] = [];
	private integrationMethods:Observable<IMetaJSONMethod[]>;


	constructor(simulationService:SimulationService, plumbService:PlumbService, plumbServiceUtilities:PlumbServiceUtilities, serverService:ServerService) {
		this.simulationService = simulationService;
		this.plumbService = plumbService;
		this.plumbServiceUtilities = plumbServiceUtilities;
		this.serverService = serverService;
		this.loadMetaBlocks();
		this.loadIntegrationMethods();
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

	run(config:ISimulationConfig):void {
		this.simulationService.setSimulationConfig(config);
		let JSONSimulation = this.simulationService.saveJSON();
		this.serverService.postSimulate(JSONSimulation)
			.subscribe((results) => console.log(results));
	}

	loadMetaBlocks():void {
		this.metaBlocks = this.serverService.getMetaBlocks().map(res =>
			this.resolvedMetaBlocks = (res as IMetaJSONBlock[])
		);
	}

	loadIntegrationMethods():void {
		this.integrationMethods = this.serverService.getIntegrationMethods().map(res => (res as IMetaJSONMethod[]));
	}

	getMetaBlocks():Observable<IMetaJSONBlock[]> {
		return this.metaBlocks;
	}

	getIntegrationMethods():Observable<IMetaJSONMethod[]> {
		return this.integrationMethods;
	}

	createBlock(className:string):Block {
		let metaBlocks = this.resolvedMetaBlocks;
		for (let i = 0; i < metaBlocks.length; i++) {
			if (metaBlocks[i].className === className) {
				let block = new Block();
				block.loadMetaJSON(metaBlocks[i]);
				block.initialize();
				return block;
			}
		}
		return null;
	}

}
