import {Injectable} from "angular2/core";
import {PlumbService} from "./PlumbService";
import {Block} from "../../csmp/Block";
import {SimulationService} from "./SimulationService";

@Injectable()
export class PlumbServiceUtilities {

	private plumbService:PlumbService = null;
	private simulationService:SimulationService = null;

	constructor(plumbService:PlumbService, simulationService:SimulationService) {
		this.plumbService = plumbService;
		this.simulationService = simulationService;
	}

	rotate(block:Block, direction:string, amount?:number = 1) {
		let rotations = {
			Right: {
				Right: "Bottom",
				Bottom: "Left",
				Left: "Top",
				Top: "Right",
				TopRight: "BottomRight",
				BottomRight: "BottomLeft",
				BottomLeft: "TopLeft",
				TopLeft: "TopRight"
			},
			Left: {
				Right: "Top",
				Bottom: "Right",
				Left: "Bottom",
				Top: "Left",
				TopRight: "TopLeft",
				BottomRight: "TopRight",
				BottomLeft: "BottomRight",
				TopLeft: "BottomLeft"
			}
		};


		let endpoints = this.plumbService.getInstance().selectEndpoints({element: block.key});
		endpoints.each((endpoint:any) => {
			let type = endpoint.anchor.type;
			let rotation = type;
			for (let i = 0; i < amount; i++) {
				rotation = rotations[direction][rotation];
			}
			endpoint.setAnchor(rotation, true);
		});
		this.plumbService.getInstance().repaint(block.key);
	}

	resetRotations() {
		let blocks = this.simulationService.getBlocks();
		for (let i = 0; i < blocks.length; i++) {
			this.rotate(blocks[i], "Right", blocks[i].rotation);
		}
	}

}
