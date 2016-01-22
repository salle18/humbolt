import {Directive, Input} from "angular2/core";
import {Block} from "../csmp/Block";
import {AppService} from "../core/services/AppService";
import {KeyEvent} from "../core/commons/KeyEvent";

@Directive({
	selector: "[csmp-interactive-block]",
	host: {
		"(click)": "onClick()",
		"(keydown)": "onKeyDown($event)"
	}
})
export class CsmpInteractiveBlock {

	private appService:AppService;
	@Input() block:Block;

	constructor(appService:AppService) {
		this.appService = appService;
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
