import {Directive, Input, OnInit} from "angular2/angular2";
import {PlumbService} from "../core/services/PlumbService";
import {Element} from "../csmp/Element";

interface IAnchor {
	anchor: string;
}

@Directive({
	selector: "[csmp-endpoints]"
})
export class CsmpEndpoints implements OnInit {

	@Input() element:Element;

	private plumbService:PlumbService;

	private inputAnchors:IAnchor[][] = [[{anchor: "Left"}], [{anchor: "TopLeft"}, {anchor: "BottomLeft"}], [{anchor: "TopLeft"}, {anchor: "Left"}, {anchor: "BottomLeft"}]];
	private outputAnchor:IAnchor = {anchor: "Right"};

	private outputEndpoint = {
		isSource: true,
		endpoint: "Dot",
		maxConnections: -1,
		paintStyle: {
			fillStyle: "#337ab7"
		},
		connectorOverlays: [["Arrow", {location: 0.5}]]
	};

	private inputEndpoint = {
		isTarget: true,
		endpoint: "Rectangle",
		maxConnections: 1,
		parameters: {
			index: 0
		},
		paintStyle: {
			fillStyle: "#337ab7"
		}
	};

	constructor(plumbService:PlumbService) {
		this.plumbService = plumbService;
	}

	onInit() {
		if (this.element.getHasOutput()) {
			this.plumbService.getInstance().addEndpoint(this.element.key, this.outputAnchor, this.outputEndpoint);
		}
		let numOfInputs = this.element.inputs.length;
		for (let i = 0; i < numOfInputs; i++) {
			let endpoint = JSON.parse(JSON.stringify(this.inputEndpoint));
			endpoint.parameters.index = i;
			this.plumbService.getInstance().addEndpoint(this.element.key, this.inputAnchors[numOfInputs][i], endpoint);
		}
	}

}