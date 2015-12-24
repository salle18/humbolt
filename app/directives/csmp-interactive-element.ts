import {Directive, Input} from "angular2/angular2";
import {Element} from "../csmp/Element";
import {AppService} from "../core/services/AppService";
import {KeyEvent} from "../core/commons/KeyEvent";

@Directive({
	selector: "[csmp-interactive-element]",
	host: {
		"(click)": "onClick()",
		"(keydown)": "onKeyDown($event)"
	}
})
export class CsmpInteractiveElement {

	private appService:AppService;
	@Input() element:Element;

	constructor(appService:AppService) {
		this.appService = appService;
	}

	onClick() {
		this.appService.setActiveElement(this.element);
	}

	onKeyDown(e) {
		if (e.keyCode === KeyEvent.DOM_VK_DELETE) {
			this.appService.removeActiveElement();
		}
	}

}
