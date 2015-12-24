import {Injectable} from "angular2/angular2";
import {PlumbService} from "./PlumbService";
import {Element} from "../../csmp/Element";

@Injectable()
export class PlumbServiceUtilities {

	private plumbService:PlumbService = null;

	constructor(plumbService:PlumbService) {
		this.plumbService = plumbService;
	}

	rotate(element:Element, direction:string) {
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

		let endpoints = this.plumbService.getInstance().selectEndpoints({element: element.key});
		endpoints.each(function (endpoint:any) {
			let type = endpoint.anchor.type;
			endpoint.setAnchor(rotations[direction][type], true);
		});
		this.plumbService.getInstance().repaint(element.key);
	}

}
