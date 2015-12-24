import {Injectable} from "angular2/angular2";
import "sporritt/jsPlumb";
import {SimulationService} from "./SimulationService";
import {Block, EmptyBlock} from "../../csmp/Block";

declare let jsPlumb:any;

@Injectable()
export class PlumbService {

	private instance:JsPlumbInstance = null;
	private simulationService:SimulationService = null;

	constructor(simulationService:SimulationService) {
		this.simulationService = simulationService;
		jsPlumb.ready(() => {
			this.createInstance();
			this.bindEvents();
		});
	}

	createInstance():void {
		this.instance = jsPlumb.getInstance();
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

	removeAllBlocks() {
		this.simulationService.getBlocks().forEach((block:Block) => {
			this.removeBlock(block.key);
		});
	}

	bindEvents():void {

		/**
		 * Sprečavamo da se block veže za samog sebe.
		 */
		this.instance.bind("beforeDrop", (info) => {
			return info.sourceId !== info.targetId;
		});

		this.instance.bind("connection", (info) => {
			let sourceBlock:Block = this.simulationService.getBlock(info.sourceId);
			let targetBlock:Block = this.simulationService.getBlock(info.targetId);
			let targetIndex = info.connection.getParameter("inputIndex");
			targetBlock.inputs[targetIndex] = sourceBlock;
			sourceBlock.addOutput(targetIndex, targetBlock);
		});

		this.instance.bind("connectionDetached", (info) => {
			let sourceBlock:Block = this.simulationService.getBlock(info.sourceId);
			let targetBlock:Block = this.simulationService.getBlock(info.targetId);
			let targetIndex = info.connection.getParameter("inputIndex");
			targetBlock.inputs[targetIndex] = new EmptyBlock();
			sourceBlock.removeOutput(targetIndex, targetBlock);
		});

		this.instance.bind("connectionMoved", (info) => {
			let sourceBlock:Block = this.simulationService.getBlock(info.originalSourceId);
			let targetBlock:Block = this.simulationService.getBlock(info.originalTargetId);
			let targetIndex = info.connection.getParameter("inputIndex");
			targetBlock.inputs[targetIndex] = new EmptyBlock();
			sourceBlock.removeOutput(targetIndex, targetBlock);
		});
	}

}
