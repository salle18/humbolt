import {Injectable} from "angular2/core";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService} from "./ServerService";
import {MessageService} from "./MessageService";
import {Block, IMetaJSONBlock} from "../../csmp/Block";
import {IMetaJSONMethod, ISimulationConfig} from "../../csmp/Simulation";

@Injectable()
export class AppService {

	private simulationService:SimulationService = null;
	private plumbService:PlumbService = null;
	private plumbServiceUtilities:PlumbServiceUtilities = null;
	private serverService:ServerService = null;
	private messageService:MessageService = null;
	public activeBlock:Block = null;
	private metaBlocks:IMetaJSONBlock[] = [];
	private integrationMethods:IMetaJSONMethod[] = [];


	constructor(simulationService:SimulationService, plumbService:PlumbService, plumbServiceUtilities:PlumbServiceUtilities, serverService:ServerService, messageService:MessageService) {
		this.simulationService = simulationService;
		this.plumbService = plumbService;
		this.plumbServiceUtilities = plumbServiceUtilities;
		this.serverService = serverService;
		this.messageService = messageService;
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
		let JSONSimulation = this.simulationService.saveJSON();
		this.serverService.postSimulation(JSONSimulation)
			.subscribe(
				data => console.log(data),
				error => this.messageService.error("Error loading simulation results...")
			);
	}

	loadMetaBlocks():void {
		this.serverService.getMetaBlocks().subscribe(
			metaBlocks => this.metaBlocks = metaBlocks,
			error => this.messageService.error("Error loading simulation blocks...")
		);
	}

	loadIntegrationMethods():void {
		this.serverService.getIntegrationMethods().subscribe(
			integrationMethods => this.integrationMethods = integrationMethods,
			error => this.messageService.error("Error loading integration methods...")
		);
	}

	getMetaBlocks():IMetaJSONBlock[] {
		return this.metaBlocks;
	}

	getIntegrationMethods():IMetaJSONMethod[] {
		return this.integrationMethods;
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

	logout():void {
		console.log("Lougout user, remove token, send logout request, redirect to login page.");
	}

}
