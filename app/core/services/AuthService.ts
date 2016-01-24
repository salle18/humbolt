import "rxjs/add/operator/map";
import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptionsArgs} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {TokenService} from "./TokenService";
import {MessageService} from "./MessageService";

export interface ILoginData {
	name: string;
	password: string;
}

@Injectable()
export class AuthService {

	private http:Http;
	private tokenService:TokenService;
	private messageService:MessageService;
	private headers:Headers;
	private url = "http://localhost:9000";

	constructor(http:Http, tokenService:TokenService, messageService:MessageService) {
		this.http = http;
		this.tokenService = tokenService;
		this.messageService = messageService;
		this.headers = new Headers();
		this.headers.set("Content-Type", "application/json");
	}

	getRequestOptions():RequestOptionsArgs {
		return {
			headers: this.headers
		};
	}

	login(loginData:ILoginData):void {
		this.http.post(this.url + "/login", JSON.stringify(loginData), this.getRequestOptions())
			.map(res => res.json()).subscribe(
			res => {
				if (res.success) {
					this.tokenService.setToken(res.token);
				} else {
					this.messageService.error(res.message);
				}
			},
			error => this.messageService.error("Error sending login data...")
		);
	}

	logout():void {
		this.tokenService.removeToken();
		this.http.get(this.url + "/logout", this.getRequestOptions());
	}


}