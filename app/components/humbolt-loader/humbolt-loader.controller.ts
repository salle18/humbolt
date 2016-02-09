import {Component, Inject} from "angular2/core";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {Message} from "../../core/services/MessageService";

console.log(Message);

@Component({
	selector: "humbolt-loader",
	templateUrl: "components/humbolt-loader/humbolt-loader.template.html",
	directives: [CsmpUpgradeElement]
})
export class HumboltLoader {

	private message:string = "";

	setMessage(message:string):void {
		this.message = message;
	}

}
