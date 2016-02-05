"use strict";

import {Component} from "angular2/core";
import {GpssMenu} from "../../components/gpss-menu/gpss-menu.controller";
import {CsmpHeader} from "../../components/csmp-header/csmp-header.controller";
import {RouterLink} from "angular2/router";

@Component({
	selector: "page-gpss",
	templateUrl: "pages/gpss/gpss.template.html",
	directives: [CsmpHeader, GpssMenu, RouterLink]
})
export class Gpss {

	constructor() {
		console.log("Gpss component loaded");
	}
}
