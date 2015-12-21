import {Component, Input} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {CsmpCloneElement} from "../../directives/csmp-clone-element";

@Component({
	selector: "csmp-element",
	templateUrl: "components/csmp-element/csmp-element.template.html",
	directives: [CsmpUpgradeElement, CsmpCloneElement]
})
export class CsmpElement {

	@Input() element:Element;

}
