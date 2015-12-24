import {Directive, Input, OnInit} from "angular2/angular2";
import {PlumbService} from "../core/services/PlumbService";
import {Block} from "../csmp/Block";

@Directive({
	selector: "[csmp-draggable]"
})
export class CsmpDraggable implements OnInit {

	private plumbService:PlumbService;
	@Input() block:Block;

	constructor(plumbService:PlumbService) {
		this.plumbService = plumbService;
	}

	onInit() {
		this.plumbService.getInstance().draggable(this.block.key, {
			containment: "parent"
		});
	}

}
