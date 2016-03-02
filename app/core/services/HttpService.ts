"use strict";

import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptionsArgs} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./AuthService";
import "rxjs/add/operator/map";

@Injectable()
export class HttpService {

    private headers:Headers = new Headers();
    private token:string = "";

    constructor(private http:Http) {
    }

    getRequestOptionsArgs():RequestOptionsArgs {
        this.headers.set("Content-Type", "application/json");
        this.headers.set("Authorization", "Bearer " + this.token);
        return {
            headers: this.headers
        };
    }

    get<T>(url:string):Observable<T> {
        return this.http.get(url, this.getRequestOptionsArgs()).map(res => {
            this.refreshToken(res.headers);
            return res.json();
        });
    }

    post<T>(url:string, data:Object):Observable<T> {
        return this.http.post(url, JSON.stringify(data), this.getRequestOptionsArgs()).map(res => {
            this.refreshToken(res.headers);
            return res.json();
        });
    }

    delete<T>(url:string):Observable<T> {
        return this.http.delete(url, this.getRequestOptionsArgs()).map(res => {
            this.refreshToken(res.headers);
            return res.json();
        });
    }

    setToken(token:string):void {
        if (token) {
            this.token = token;
        }
    }

    refreshToken(headers:Headers) {
        let auth = headers.get("Authorization");
        let regex = new RegExp("Bearer ");
        if (auth && regex.test(auth)) {
            this.setToken(auth.split(" ")[1]);
        }
    }

    clearToken():void {
        this.token = "";
    }
}
