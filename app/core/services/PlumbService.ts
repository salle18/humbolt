import "sporritt/jsPlumb";
import {Injectable, NgZone} from "angular2/core";
import {SimulationService} from "./SimulationService";
import {Block, EmptyBlock} from "../../csmp/Block";

declare let jsPlumb:any;

@Injectable()
export class PlumbService {

	private instance:JsPlumbInstance = null;
	private simulationService:SimulationService = null;
	private zone:NgZone;

	constructor(simulationService:SimulationService, zone:NgZone) {
		this.simulationService = simulationService;
		this.zone = zone;
		jsPlumb.ready(() => {
			this.createInstance();
			this.bindEvents();
		});
	}

	createInstance():void {
		this.instance = jsPlumb.getInstance({
			Container: "csmp-canvas"
		});
	}

	getInstance():JsPlumbInstance {
		return this.instance;
	}

	removeBlock(key:string):void {
		this.instance.detachAllConnections(key, {
			fireEvent: false
		});
		this.instance.removeAllEndpoints(key);
		this.instance.detach(key);
	}

	reset() {
		this.instance.reset();
		this.createInstance();
		this.bindEvents();
	}

	resetConnections() {
		let blocks = this.simulationService.getBlocks();
		for (let i = 0; i < blocks.length; i++) {
			//NOT IMPLEMENTED RESET CONNECTIONS
			//let endpoints = this.getInstance().getEndpoints(blocks[i].key);
		}
		console.log("RESET BLOCKS");
	}

	bindEvents():void {

		/**
		 * connectionMoved ne obezbeđuje parametre stare konekcije zato ovde pamtimo stari index.
		 */
		let oldIndex = 0;

		this.instance.bind("beforeDrop", (info) => {
			/**
			 * Pamtimo stari parametar index.
			 */
			oldIndex = info.connection.getParameter("index");
			/**
			 * Sprečavamo da se block veže za samog sebe.
			 */
			return info.sourceId !== info.targetId;
		});

		this.instance.bind("connection", (info) => {
			let sourceBlock:Block = this.simulationService.getBlock(info.sourceId);
			let targetBlock:Block = this.simulationService.getBlock(info.targetId);
			let index = info.connection.getParameter("index");
			this.zone.run(() => {
				targetBlock.inputs[index] = sourceBlock;
				sourceBlock.addOutput(index, targetBlock);
			});
		});

		this.instance.bind("connectionDetached", (info) => {
			let sourceBlock:Block = this.simulationService.getBlock(info.sourceId);
			let targetBlock:Block = this.simulationService.getBlock(info.targetId);
			let index = info.connection.getParameter("index");
			this.zone.run(() => {
				targetBlock.inputs[index] = new EmptyBlock();
				sourceBlock.removeOutput(index, targetBlock);
			});
		});

		this.instance.bind("connectionMoved", (info) => {
			let sourceBlock:Block = this.simulationService.getBlock(info.originalSourceId);
			let targetBlock:Block = this.simulationService.getBlock(info.originalTargetId);
			this.zone.run(() => {
				targetBlock.inputs[oldIndex] = new EmptyBlock();
				sourceBlock.removeOutput(oldIndex, targetBlock);
			});
		});
	}

}
