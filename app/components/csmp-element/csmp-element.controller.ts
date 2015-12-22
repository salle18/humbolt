import {Component, Input} from "angular2/angular2";

@Component({
	selector: "csmp-element",
	templateUrl: "components/csmp-element/csmp-element.template.html"
})
export class CsmpElement {
	@Input() element:Element;

}
