import {Injectable} from "angular2/core";

@Injectable()
export class TokenService {

    private TOKEN_VALIDITY = 59 * 60 * 1000;

    getToken():string {
        return localStorage.getItem("token");
    }

    setToken(token:string):void {
        localStorage.setItem("token", token);
        this.setExpires();
    }

    setExpires():void {
        localStorage.setItem("expires", +new Date() + this.TOKEN_VALIDITY);
    }

    getExpires():number {
        return localStorage.getItem("expires");
    }

    isExpired():boolean {
        let expires = this.getExpires();
        return !expires || (+new Date() > expires);
    }

    hasValidToken():boolean {
        let token = this.getToken();
        return token && !this.isExpired();
    }

    clear():void {
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
    }
}
