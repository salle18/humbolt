"use strict";

import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";

@Component({
	selector: "page-gpss",
	templateUrl: "pages/gpss/gpss.template.html",
	directives: [RouterLink]
})
export class Gpss {

	constructor() {
		console.log("Gpss component loaded");
	}
}
