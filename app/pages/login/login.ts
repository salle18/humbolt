"use strict";

import {Component} from "angular2/core";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";
import {AppService} from "../../core/services/AppService";
import {ILoginData} from "../../core/services/AuthService";


@Component({
	selector: "page-login",
	templateUrl: "pages/login/login.template.html",
	directives: [CsmpUpgradeElement]
})
export class Login {
	
	private user:ILoginData = {
		name: "",
		password: ""
	};

	constructor(private appService:AppService) {
	}

	login():void {
		this.appService.login(this.user);
	}
}
