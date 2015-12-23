import "sporritt/jsPlumb";
import {Element} from "../../csmp/Element";

declare let jsPlumb:any;

export class PlumbService {

	private instance:JsPlumbInstance = null;

	constructor() {
		jsPlumb.ready(() => {
			this.instance = jsPlumb.getInstance();
		});
	}

	getInstance():JsPlumbInstance {
		return this.instance;
	}

}

export class PlumbServiceUtilities {

	private plumbService:PlumbService = null;

	constructor(plumbService:PlumbService) {
		this.plumbService = plumbService;
	}

	rotate(element:Element) {
		let transforms = {
			Right: 'Bottom',
			Bottom: 'Left',
			Left: 'Top',
			Top: 'Right',
			TopRight: 'BottomRight',
			BottomRight: 'BottomLeft',
			BottomLeft: 'TopLeft',
			TopLeft: 'TopRight'
		};

		let endpoints = this.plumbService.getInstance().selectEndpoints({element: element.key});
		endpoints.each(function (endpoint:any) {
			let type = endpoint.anchor.type;
			endpoint.setAnchor(transforms[type], true);
		});
		this.plumbService.getInstance().repaint(element.key);
	}

}
