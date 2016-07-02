import {Directive, Input} from "@angular/core";
import {Block} from "../csmp/Block";
import {CsmpAppService} from "../services";
import {KeyEvent} from "../commons/KeyEvent";

@Directive({
    selector: "[csmp-interactive-block]",
    host: {
        "(click)": "onClick()",
        "(keydown)": "onKeyDown($event)"
    }
})
export class CsmpInteractiveBlock {

    @Input() block:Block;

    constructor(private appService:CsmpAppService) {
    }

    onClick() {
        this.appService.setActiveBlock(this.block);
    }

    onKeyDown(e:KeyboardEvent) {
        if (e.keyCode === KeyEvent.DOM_VK_DELETE) {
            this.appService.removeActiveBlock();
        }
    }

}
