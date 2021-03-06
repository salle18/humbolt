import {Directive, Input, OnInit, NgZone} from "@angular/core";
import {PlumbService} from "../services";
import {Block} from "../csmp/Block";

interface IAnchor {
    anchor: string;
}

@Directive({
    selector: "[csmp-endpoints]"
})
export class CsmpEndpoints implements OnInit {

    @Input() block:Block;

    private inputAnchors:IAnchor[][] = [[{anchor: "Left"}], [{anchor: "TopLeft"}, {anchor: "BottomLeft"}], [{anchor: "TopLeft"}, {anchor: "Left"}, {anchor: "BottomLeft"}]];
    private outputAnchor:IAnchor = {anchor: "Right"};

    private outputEndpoint = {
        isSource: true,
        endpoint: "Dot",
        maxConnections: -1,
        paintStyle: {
            fillStyle: "#337ab7"
        },
        connector: ["Flowchart"],
        connectorOverlays: [["Arrow", {location: 0.5}]],
        uuid: "",
        cssClass: "outputEndpoint"
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
        },
        cssClass: "inputEndpoint"
    };

    constructor(private plumbService:PlumbService, private zone:NgZone) {
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
