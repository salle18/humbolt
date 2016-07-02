import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpService} from "./HttpService";
import {MessageService} from "./MessageService";
import {CsmpAppService} from "./CsmpAppService";
import {GpssAppService} from "./GpssAppService";
import {TokenService} from "./TokenService";

export interface ILoginData {
    name: string;
    password: string;
}

interface IResponse {
    token?:string;
    error?:string;
}

@Injectable()
export class AuthService {

    private url:string = "";
    private identifier:string = "user_data";

    constructor(private httpService:HttpService, private messageService:MessageService, private router:Router,
                private csmpAppService:CsmpAppService, private gpssAppService:GpssAppService, private tokenService:TokenService) {
    }

    login(loginData:ILoginData):void {
        this.messageService.loader();
        this.httpService.post<IResponse>(this.url + "/login", loginData)
            .subscribe(
                res => {
                    if (res.token) {
                        this.setUser(loginData.name);
                        this.tokenService.setToken(res.token);
                        this.router.navigate(["Hub"]);
                    } else if (res.error) {
                        this.messageService.error(res.error);
                    } else {
                        this.messageService.error("Unknown login error.");
                    }
                },
                error => this.messageService.handleError(error),
                () => this.messageService.hideLoader()
            );
    }

    logout():void {
        localStorage.removeItem("username");
        this.tokenService.clear();
        this.csmpAppService.reset();
        this.gpssAppService.reset();
        this.router.navigate(["Login"]);
    }

    isLoggedIn():boolean {
        return this.tokenService.hasValidToken();
    }

    setUser(username:string):void {
        localStorage.setItem("username", username);
    }

    getUser():string {
        return localStorage.getItem("username");
    }

}
