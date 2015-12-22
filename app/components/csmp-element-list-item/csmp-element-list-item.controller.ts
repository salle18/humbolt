import {Component, Input} from "../../../node_modules/angular2/angular2.d";
import {Element} from "../../csmp/Element";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {CsmpCloneElement} from "../../directives/csmp-clone-element";

@Component({
	selector: "csmp-element-list-item",
	templateUrl: "components/csmp-element-list-item/csmp-element-list-item.template.html",
	directives: [CsmpUpgradeElement, CsmpCloneElement]
})
export class CsmpElementListItem {

	@Input() element:Element;

}
