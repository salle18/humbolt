import {Component, Input} from "@angular/core";
import {Block} from "../../csmp/Block";

@Component({
    selector: "csmp-block",
    templateUrl: "components/csmp-block/csmp-block.template.html"
})
export class CsmpBlock {
    @Input() block:Block;

    constructor() {
        return;
    }
}
