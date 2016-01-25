import "rxjs/add/operator/map";
import {Injectable} from "angular2/core";
import {Router} from "angular2/router";
import {HttpService} from "./HttpService";
import {Observable} from "rxjs/Observable";
import {TokenService} from "./TokenService";
import {MessageService} from "./MessageService";

export interface ILoginData {
	name: string;
	password: string;
}

interface IResponse {
	success:boolean;
	token?:string;
	message?:string;
}

@Injectable()
export class AuthService {

	private url = "http://localhost:9000";

	constructor(private httpService:HttpService, private tokenService:TokenService, private messageService:MessageService, private router:Router) {
	}

	login(loginData:ILoginData):void {
		this.httpService.post<IResponse>(this.url + "/login", loginData)
			.subscribe(
				res => {
					if (res.success) {
						this.tokenService.setToken(res.token);
						this.router.navigate(["Hub"]);
					} else {
						this.messageService.error(res.message);
					}
				},
				error => this.messageService.error("Error sending login data...")
			);
	}

	logout():void {
		this.tokenService.removeToken();
		this.router.navigate(["Login"]);
	}

	isLoggedIn():boolean {
		return this.tokenService.hasToken();
	}


}
