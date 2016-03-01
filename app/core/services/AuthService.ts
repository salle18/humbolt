import "rxjs/add/operator/map";
import {Injectable} from "angular2/core";
import {Router} from "angular2/router";
import {HttpService} from "./HttpService";
import {Observable} from "rxjs/Observable";
import {MessageService} from "./MessageService";
import {CsmpAppService} from "./CsmpAppService";
import {GpssAppService} from "./GpssAppService";

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

    private url:string = "";
    private identifier:string = "user_data";

    constructor(private httpService:HttpService, private messageService:MessageService, private router:Router,
                private csmpAppService:CsmpAppService, private gpssAppService:GpssAppService) {
        let user = this.user();
        if (user) {
            this.httpService.setToken(user.token);
        }
    }

    login(loginData:ILoginData):void {
        this.httpService.post<IResponse>(this.url + "/login", loginData)
            .subscribe(
                res => {
                    if (res.token) {
                        this.setUser({
                            name: loginData.name,
                            token: res.token
                        });
                        this.httpService.setToken(res.token);
                        this.router.navigate(["Hub"]);
                    } else if (res.error) {
                        this.messageService.error(res.error);
                    } else {
                        this.messageService.error("Unknown login error.")
                    }
                },
                error => this.messageService.handleError(error)
            );
    }

    logout():void {
        this.clearUser();
        this.csmpAppService.reset();
        this.gpssAppService.reset();
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
