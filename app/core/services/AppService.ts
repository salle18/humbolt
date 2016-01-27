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
				error => this.messageService.error("Error saving simulation...")
			);
	}

	run(config:ISimulationConfig):void {
		let JSONSimulation = this.simulationService.saveJSON();
		this.serverService.postSimulation(JSONSimulation)
			.subscribe(
				results => {
					this.simulationService.setSimulationResults(results);
					this.router.navigate(["Graph"]);
				},
				error => this.messageService.error("Error loading simulation results...")
			);
	}

	loadMetaBlocks():void {
		this.serverService.getMetaBlocks().subscribe(
			metaBlocks => this.metaBlocks.push.apply(this.metaBlocks, metaBlocks),
			error => this.messageService.error("Error loading simulation blocks...")
		);
	}

	loadIntegrationMethods():void {
		this.serverService.getIntegrationMethods().subscribe(
			integrationMethods => this.integrationMethods.push.apply(this.integrationMethods, integrationMethods),
			error => this.messageService.error("Error loading integration methods...")
		);
	}

	listSimulations():void {
		this.serverService.listSimulations().subscribe(
			simulations => {
				this.simulations.length = 0;
				this.simulations.push.apply(this.simulations, simulations);
			},
			error => this.messageService.error("Error loading simulation list...")
		);
	}

	removeSimulation(id:string):void {
		this.serverService.removeSimulation(id).subscribe(
			simulation => {
				this.messageService.success("Simulation deleted...");
				this.listSimulations();
			},
			error => this.messageService.error("Error deleting simulation...")
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

}
