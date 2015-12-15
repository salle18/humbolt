import {View, Component, Input} from "angular2/angular2";
import {Element} from "../../csmp/Element";


@Component({
	selector: "csmp-element"
})
@View({
	templateUrl: "components/csmp-element/csmp-element.template.html"
})
export class CsmpElement {

	@Input() element:Element;

}
