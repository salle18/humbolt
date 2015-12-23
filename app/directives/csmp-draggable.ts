import {Directive, Input, OnInit} from "angular2/angular2";
import {PlumbService} from "../core/services/PlumbService";
import {Element} from "../csmp/Element";

@Directive({
	selector: "[csmp-draggable]"
})
export class CsmpDraggable implements OnInit {

	private plumbService:PlumbService;
	@Input() element:Element;

	constructor(plumbService:PlumbService) {
		this.plumbService = plumbService;
	}

	onInit() {
		this.plumbService.draggable(this.element.key);
	}

}
