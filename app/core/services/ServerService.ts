import "rxjs/add/operator/map";
import {Injectable} from "angular2/core";
import {Http, Response, Headers, RequestOptionsArgs} from "angular2/http";
import {IJSONSimulation, IMetaJSONMethod} from "../../csmp/Simulation";
import {Observable} from "rxjs/Observable";
import {IMetaJSONBlock} from "../../csmp/Block";

@Injectable()
export class ServerService {

	private http:Http;

	private api = "http://localhost:9000/api";
	private headers:Headers;

	constructor(http:Http) {
		this.http = http;
		this.headers = new Headers();
		this.headers.set("Content-Type", "application/json");
	}

	getRequestOptions():RequestOptionsArgs {
		return {
			headers: this.headers
		};
	}

	getMetaBlocks():Observable<IMetaJSONBlock[]> {
		return this.http.get(this.api + "/csmp/blocks", this.getRequestOptions())
			.map(res => res.json());
	}

	getIntegrationMethods():Observable<IMetaJSONMethod[]> {
		return this.http.get(this.api + "/csmp/integrationmethods", this.getRequestOptions())
			.map(res => res.json());
	}

	postSimulation(JSONSimulation:IJSONSimulation):Observable<any> {
		return this.http.post(this.api + "/csmp/simulate", JSON.stringify(JSONSimulation), this.getRequestOptions())
			.map(res => res.json());
	}
}
