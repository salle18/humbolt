
"use strict";

import {Component} from "angular2/core";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";



@Component({
	selector: "page-login",
	templateUrl: "pages/login/login.template.html",
	directives: [CsmpUpgradeElement]
})
export class Login {

	constructor() {
		console.log("Login component loaded");
	}
}
