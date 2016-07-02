import {Component, DoCheck} from "@angular/core";
import {Block} from "../../csmp/Block";
import {SimulationService} from "../../core/services/SimulationService";
import {CsmpAppService} from "../../core/services/CsmpAppService";
import {IParam} from "../../csmp/interfaces/IParam";

@Component({
    selector: "csmp-inspector",
    templateUrl: "components/csmp-inspector/csmp-inspector.template.html"
})
export class CsmpInspector implements DoCheck {

    public blocks:Block[] = [];
    public activeBlock:Block = null;

    constructor(private appService:CsmpAppService, private simulationService:SimulationService) {
        this.blocks = simulationService.getBlocks();
    }

    setActiveBlock(block:Block):void {
        this.appService.setActiveBlock(block);
    }

    ngDoCheck() {
        this.activeBlock = this.appService.activeBlock;
    }

}