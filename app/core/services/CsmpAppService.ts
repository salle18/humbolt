import {Injectable} from "angular2/core";
import {Router} from "angular2/router";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService, ApiType} from "./ServerService";
import {AuthService} from "./AuthService";
import {MessageService} from "./MessageService";
import {Block} from "../../csmp/Block";
import {Observable} from "rxjs/Observable";
import {IJSONBlock} from "../../csmp/interfaces/IJSONBlock";
import {IMetaJSONBlock} from "../../csmp/interfaces/IMetaJSONBlock";
import {IUser} from "./AuthService";
import {ILoginData} from "./AuthService";
import {IJSONSimulation} from "../../csmp/interfaces/IJSONSimulation";
import {IMetaJSONMethod} from "../../csmp/interfaces/IMetaJSONMethod";
import {ISimulationConfig} from "../../csmp/interfaces/ISimulationConfig";

@Injectable()
export class CsmpAppService {

	public activeBlock:Block = null;
	public metaBlocks:IMetaJSONBlock[] = [];
	public integrationMethods:IMetaJSONMethod[] = [];
	public simulations:IJSONSimulation[] = [];

	constructor(private simulationService:SimulationService, private plumbService:PlumbService,
				private plumbServiceUtilities:PlumbServiceUtilities, private serverService:ServerService,
				private authService:AuthService, private messageService:MessageService, private router:Router) {
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
				error => this.handleError(error)
			);
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
					this.handleError(error);
				}
			);
	}

	loadMetaBlocks():void {
		this.serverService.setApiType(ApiType.CSMP).getMetaBlocks().subscribe(
			metaBlocks => this.metaBlocks.push.apply(this.metaBlocks, metaBlocks),
			error => this.handleError(error)
		);
	}

	loadIntegrationMethods():void {
		this.serverService.setApiType(ApiType.CSMP).getIntegrationMethods().subscribe(
			integrationMethods => this.integrationMethods.push.apply(this.integrationMethods, integrationMethods),
			error => this.handleError(error)
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
				error => this.handleError(error)
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
			error => this.handleError(error)
		);
	}

	removeSimulation(id:string):void {
		this.serverService.setApiType(ApiType.CSMP).removeSimulation<IJSONSimulation>(id).subscribe(
			simulation => {
				this.messageService.success("Simulation deleted...");
				this.listSimulations();
			}, error => this.handleError(error)
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

	user():IUser {
		return this.authService.user();
	}

	login(loginData:ILoginData):void {
		this.authService.login(loginData);
	}

	logout():void {
		this.reset();
		this.authService.logout();
	}

	handleError(error:any) {
		if (error && error.message) {
			this.messageService.error(error.message);
		} else {
			console.error(error);
			this.messageService.error("Unknown error, see console.");
		}
	}

}
