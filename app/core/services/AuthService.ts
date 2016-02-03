import "rxjs/add/operator/map";
import {Injectable} from "angular2/core";
import {Router} from "angular2/router";
import {HttpService} from "./HttpService";
import {Observable} from "rxjs/Observable";
import {MessageService} from "./MessageService";

export interface IUser {
	name: string;
	token: string;
}

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

	private url:string = "http://localhost:9000";
	private identifier:string = "user_data";

	constructor(private httpService:HttpService, private messageService:MessageService, private router:Router) {
	}

	login(loginData:ILoginData):void {
		this.httpService.post<IResponse>(this.url + "/login", loginData)
			.subscribe(
				res => {
					if (res.success) {
						this.setUser({
							name: loginData.name,
							token: res.token
						});
						this.httpService.setToken(res.token);
						this.router.navigate(["Hub"]);
					} else {
						this.messageService.error(res.message);
					}
				},
				error => this.messageService.error("Error sending login data...")
			);
	}

	logout():void {
		this.clearUser();
		this.httpService.clearToken();
		this.router.navigate(["Login"]);
	}

	isLoggedIn():boolean {
		return this.user() !== null;
	}

	user():IUser {
		let user = localStorage.getItem(this.identifier);
		return user ? JSON.parse(user) : null;
	}

	getToken():string {
		let user = this.user();
		if (user) {
			return user.token;
		}
	}

	setUser(user:IUser):void {
		localStorage.setItem(this.identifier, JSON.stringify(user));
	}

	clearUser():void {
		localStorage.removeItem(this.identifier);
	}

}
