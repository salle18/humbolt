import {Directive, Input, OnInit, NgZone} from "angular2/angular2";
import {PlumbService} from "../core/services/PlumbService";
import {Block} from "../csmp/Block";

@Directive({
	selector: "[csmp-draggable]"
})
export class CsmpDraggable implements OnInit {

	private plumbService:PlumbService;
	private zone:NgZone;
	@Input() block:Block;

	constructor(plumbService:PlumbService, zone:NgZone) {
		this.plumbService = plumbService;
		this.zone = zone;
	}

	/**
	 * Poziva se prilikom inicijalizacije direktive.
	 * Obavezno izvan angular konteksta jer nema izmene interfejsa.
	 */
	onInit() {
		this.zone.runOutsideAngular(() => {
			this.plumbService.getInstance().draggable(this.block.key, {
				containment: "parent"
			});
		});
	}

}
