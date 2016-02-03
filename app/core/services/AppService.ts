import {Injectable} from "angular2/core";
import {Router} from "angular2/router";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService} from "./ServerService";
import {AuthService} from "./AuthService";
import {MessageService} from "./MessageService";
import {Block, IMetaJSONBlock} from "../../csmp/Block";
import {IMetaJSONMethod, ISimulationConfig} from "../../csmp/Simulation";
import {ILoginData} from "./AuthService";
import {IJSONSimulation} from "../../csmp/Simulation";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {

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
		this.serverService.saveSimulation(this.simulationService.saveJSON())
			.subscribe(
				simulation => this.messageService.success("Simulation saved..."),
				error => this.handleError(error)
			);
	}

	run():void {
		let JSONSimulation = this.simulationService.saveJSON();
		this.serverService.postSimulation(JSONSimulation)
			.subscribe(
				results => {
					this.simulationService.setSimulationResults(results);
					this.router.navigate(["ResultsTable"]);
				},
				error => this.handleError(error)
			);
	}

	loadMetaBlocks():void {
		this.serverService.getMetaBlocks().subscribe(
			metaBlocks => this.metaBlocks.push.apply(this.metaBlocks, metaBlocks),
			error => this.handleError(error)
		);
	}

	loadIntegrationMethods():void {
		this.serverService.getIntegrationMethods().subscribe(
			integrationMethods => this.integrationMethods.push.apply(this.integrationMethods, integrationMethods),
			error => this.handleError(error)
		);
	}

	listSimulations():void {
		this.serverService.listSimulations().subscribe(
			simulations => {
				this.simulations.length = 0;
				this.simulations.push.apply(this.simulations, simulations);
			},
			error => this.handleError(error)
		);
	}

	loadSimulation(id:string):void {
		this.serverService.loadSimulation(id).subscribe(
			simulation => this.simulationService.loadSimulation(simulation),
			error => this.handleError(error)
		);
	}

	removeSimulation(id:string):void {
		this.serverService.removeSimulation(id).subscribe(
			simulation => {
				this.messageService.success("Simulation deleted...");
				this.listSimulations();
			}, error => this.handleError(error)
		);
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
