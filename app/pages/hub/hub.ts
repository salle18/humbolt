"use strict";

import {Component} from "angular2/core";

@Component({
	selector: "page-hub",
	templateUrl: "pages/hub/hub.template.html",
	directives: []
})
export class Hub {

	constructor() {
		console.log("Hub component loaded");
	}
}
