import {Component, Input, ElementRef} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {CsmpDraggable} from "../../directives/csmp-draggable";


@Component({
	selector: "csmp-element",
	templateUrl: "components/csmp-element/csmp-element.template.html",
	directives: [CsmpUpgradeElement, CsmpDraggable]
})
export class CsmpElement {

	@Input() element:Element;

}
