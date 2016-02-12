import {Injectable} from "angular2/core";
import {Router} from "angular2/router";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService, ApiType} from "./ServerService";
import {MessageService} from "./MessageService";
import {Block} from "../../csmp/Block";
import {Observable} from "rxjs/Observable";
import {IJSONBlock} from "../../csmp/interfaces/IJSONBlock";
import {IMetaJSONBlock} from "../../csmp/interfaces/IMetaJSONBlock";
import {IJSONSimulation} from "../../csmp/interfaces/IJSONSimulation";
import {IMetaJSONMethod} from "../../csmp/interfaces/IMetaJSONMethod";
import {ISimulationConfig} from "../../csmp/interfaces/ISimulationConfig";
import {FileService} from "./FileService";

@Injectable()
export class CsmpAppService {

	public activeBlock:Block = null;
	public metaBlocks:IMetaJSONBlock[] = [];
	public integrationMethods:IMetaJSONMethod[] = [];
	public simulations:IJSONSimulation[] = [];
	public extension = {
		simulation: ".wcsmp",
		results: ".wcsmpx"
	};

	constructor(private simulationService:SimulationService, private plumbService:PlumbService,
				private plumbServiceUtilities:PlumbServiceUtilities, private serverService:ServerService,
				private messageService:MessageService, private router:Router, private fileService:FileService) {
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
			this.activeBlock.rotate(direction);
			this.plumbServiceUtilities.rotate(this.activeBlock, direction);
		}
	}

	reset():void {
		this.activeBlock = null;
		this.plumbService.reset();
		this.simulationService.reset();
	}

	save():void {
		this.serverService.setApiType(ApiType.CSMP).saveSimulation<IJSONSimulation>(this.simulationService.saveJSON())
			.subscribe(
				simulation => this.messageService.success("Simulation saved..."),
				error => this.messageService.handleError(error)
			);
	}

	createLocalFile(data:Object, compressed:boolean = true):string {
		if (compressed) {
			return this.fileService.createFileLink(JSON.stringify(data));
		}
		return this.fileService.createFileLink(JSON.stringify(data, null, "\t"));
	}

	run():void {
		let JSONSimulation = this.simulationService.saveJSON();
		this.messageService.loader();
		this.serverService.setApiType(ApiType.CSMP).postSimulation<IJSONSimulation, number[][]>(JSONSimulation)
			.subscribe(
				results => {
					this.messageService.hideLoader();
					this.simulationService.setSimulationResults(results);
					this.router.navigate(["ResultsTable"]);
				},
				error => {
					this.messageService.hideLoader();
					this.messageService.handleError(error);
				}
			);
	}

	loadMetaBlocks():void {
		this.serverService.setApiType(ApiType.CSMP).getMetaBlocks().subscribe(
			(metaBlocks:IMetaJSONBlock[]) => {
				metaBlocks.sort((a, b) => {
					return a.sign.localeCompare(b.sign);
				});
				this.metaBlocks.push.apply(this.metaBlocks, metaBlocks);
			},
			error => this.messageService.handleError(error)
		);
	}

	loadIntegrationMethods():void {
		this.serverService.setApiType(ApiType.CSMP).getIntegrationMethods().subscribe(
			integrationMethods => this.integrationMethods.push.apply(this.integrationMethods, integrationMethods),
			error => this.messageService.handleError(error)
		);
	}

	listSimulations():void {
		this.serverService.setApiType(ApiType.CSMP).listSimulations<any>()
			.map(res => res.csmpSimulations)
			.subscribe(
				simulations => {
					this.simulations.length = 0;
					this.simulations.push.apply(this.simulations, simulations);
				},
				error => this.messageService.handleError(error)
			);
	}

	loadSimulation(id:string):void {
		this.serverService.setApiType(ApiType.CSMP).loadSimulation<IJSONSimulation>(id).subscribe(
			simulation => {
				this.reset();
				let blocks = this.createSimulationBlocks(simulation.blocks);
				this.simulationService.loadSimulation(simulation, blocks);
				setTimeout(() => {
					this.plumbService.resetConnections();
					this.plumbServiceUtilities.resetRotations();
				});//bugfix https://github.com/angular/angular/issues/6005
			},
			error => this.messageService.handleError(error)
		);
	}

	loadLocalSimulation(file:Blob):void {
		this.fileService.readFile(file).then(result => {
			this.reset();
			let simulation = JSON.parse(result);
			if (simulation.simulation && simulation.results) {
				this.simulationService.setSimulationResults(simulation.results);
				simulation = simulation.simulation;
			}
			let blocks = this.createSimulationBlocks(simulation.blocks);
			this.simulationService.loadSimulation(simulation, blocks);
			setTimeout(() => {
				this.plumbService.resetConnections();
				this.plumbServiceUtilities.resetRotations();
			});//bugfix https://github.com/angular/angular/issues/6005
		});
	}

	removeSimulation(id:string):void {
		this.serverService.setApiType(ApiType.CSMP).removeSimulation<IJSONSimulation>(id).subscribe(
			simulation => {
				this.messageService.success("Simulation deleted...");
				this.listSimulations();
			}, error => this.messageService.handleError(error)
		);
	}

	createSimulationBlocks(JSONBlocks:IJSONBlock[]):Block[] {
		let blocks:Block[] = [];
		for (let i = 0; i < JSONBlocks.length; i++) {
			blocks.push(this.createBlock(JSONBlocks[i].className));
		}
		return blocks;
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
