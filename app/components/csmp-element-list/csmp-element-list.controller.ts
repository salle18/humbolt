import {Component, NgFor} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import * as ElementDefinitions from "../../csmp/ElementDefinitions";
import {CsmpCloneElement} from "../../directives/csmp-clone-element";


@Component({
	selector: "csmp-element-list",
	templateUrl: "components/csmp-element-list/csmp-element-list.template.html",
	directives: [NgFor, CsmpCloneElement]
})
export class CsmpElementList {

	public elements:Element[] = [];

	constructor() {
		for (let key in ElementDefinitions) {
			this.elements.push(new ElementDefinitions[key]);
		}
	}
}
