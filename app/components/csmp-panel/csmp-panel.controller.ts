import {Component, NgFor} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import * as ElementDefinitions from "../../csmp/ElementDefinitions";
import {CsmpElement} from "../csmp-element/csmp-element.controller";

@Component({
	selector: "csmp-panel",
	templateUrl: "components/csmp-panel/csmp-panel.template.html",
	directives: [NgFor, CsmpElement]
})
export class CsmpPanel {

	public elements:Element[] = [];

	constructor() {
		for (let key in ElementDefinitions) {
			this.elements.push(new ElementDefinitions[key]);
		}
	}
}
