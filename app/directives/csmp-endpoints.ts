import {Directive, Input, OnInit, NgZone} from "angular2/core";
import {PlumbService} from "../core/services/PlumbService";
import {Block} from "../csmp/Block";

interface IAnchor {
	anchor: string;
}

@Directive({
	selector: "[csmp-endpoints]"
})
export class CsmpEndpoints implements OnInit {

	@Input() block:Block;

	private plumbService:PlumbService;
	private zone:NgZone;

	private inputAnchors:IAnchor[][] = [[{anchor: "Left"}], [{anchor: "TopLeft"}, {anchor: "BottomLeft"}], [{anchor: "TopLeft"}, {anchor: "Left"}, {anchor: "BottomLeft"}]];
	private outputAnchor:IAnchor = {anchor: "Right"};

	private outputEndpoint = {
		isSource: true,
		endpoint: "Dot",
		maxConnections: -1,
		paintStyle: {
			fillStyle: "#337ab7"
		},
		connectorOverlays: [["Arrow", {location: 0.5}]],
		uuid: ""
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

	constructor(plumbService:PlumbService, zone:NgZone) {
		this.plumbService = plumbService;
		this.zone = zone;
	}

	/**
	 * Poziva se prilikom inicijalizacije direktive.
	 * Obavezno izvan angular konteksta jer nema izmene interfejsa.
	 */
	ngOnInit() {
		this.zone.runOutsideAngular(() => {
			if (this.block.getHasOutput()) {
				this.outputEndpoint.uuid = this.block.getEndpointUuid(0, true);
				this.plumbService.getInstance().addEndpoint(this.block.key, this.outputAnchor, this.outputEndpoint);
			}
			let numOfInputs = this.block.inputs.length;
			if (numOfInputs > 0) {
				for (let i = 0; i < numOfInputs; i++) {
					let endpoint = JSON.parse(JSON.stringify(this.inputEndpoint));
					endpoint.parameters.index = i;
					endpoint.uuid = this.block.getEndpointUuid(i);
					this.plumbService.getInstance().addEndpoint(this.block.key, this.inputAnchors[numOfInputs - 1][i], endpoint);
				}
			}
		});
	}

}
