import {Component, Input} from "angular2/angular2";
import {Element} from "../../csmp/Element";
import {CsmpElement} from "../../components/csmp-element/csmp-element.controller";
import {CsmpCloneElement} from "../../directives/csmp-clone-element";

@Component({
	selector: "csmp-element-list-item",
	templateUrl: "components/csmp-element-list-item/csmp-element-list-item.template.html",
	directives: [CsmpElement, CsmpCloneElement]
})
export class CsmpElementListItem {

	@Input() element:Element;

}
