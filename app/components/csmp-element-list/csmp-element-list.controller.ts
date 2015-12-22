import {Component, NgFor} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import * as ElementDefinitions from "../../csmp/ElementDefinitions";
import {CsmpElementListItem} from "../csmp-element-list-item/csmp-element-list-item.controller";

@Component({
	selector: "csmp-element-list",
	templateUrl: "components/csmp-element-list/csmp-element-list.template.html",
	directives: [NgFor, CsmpElementListItem]
})
export class CsmpElementList {

	public elements:Element[] = [];

	constructor() {
		for (let key in ElementDefinitions) {
			this.elements.push(new ElementDefinitions[key]);
		}
	}
}
