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
		return this.http.get(url, this.getRequestOptionsArgs()).map(res => res.json());
	}

	post<T>(url:string, data:Object):Observable<T> {
		return this.http.post(url, JSON.stringify(data), this.getRequestOptionsArgs()).map(res => res.json());
	}

	delete<T>(url:string):Observable<T> {
		return this.http.delete(url, this.getRequestOptionsArgs()).map(res => res.json());
	}

	setToken(token:string):void {
		this.token = token;
	}

	clearToken():void {
		this.token = "";
	}
}
