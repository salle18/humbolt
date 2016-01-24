import {Http, Headers, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";


export class TokenService {

	private token_identfier:string = "token";

	getToken():string {
		return localStorage.getItem(this.token_identfier);
	}

	setToken(token:string):void {
		localStorage.setItem(this.token_identfier, token);
	}
	
	removeToken():void {
		localStorage.removeItem(this.token_identfier);
	}
	
	hasToken(): boolean {
		return !!this.getToken();
	}

}
