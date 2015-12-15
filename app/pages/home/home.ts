import { Component } from "angular2/angular2";
import { CsmpPanel } from "../../components/csmp-panel/csmp-panel.controller";

@Component({
	selector: "page-home",
	templateUrl: "pages/home/home.template.html",
	directives: [CsmpPanel]
})
export class Home {

	constructor() {
		console.log("Home component loaded");
	}
}
