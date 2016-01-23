import {Injectable} from "angular2/core";
import {PlumbService} from "./PlumbService";
import {Block} from "../../csmp/Block";

@Injectable()
export class PlumbServiceUtilities {

	private plumbService:PlumbService = null;

	constructor(plumbService:PlumbService) {
		this.plumbService = plumbService;
	}

	rotate(block:Block, direction:string) {
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
			endpoint.setAnchor(rotations[direction][type], true);
		});
		this.plumbService.getInstance().repaint(block.key);
	}

}
