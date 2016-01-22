import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import {IJSONSimulation, IMetaJSONMethod} from "../../csmp/Simulation";
import { Observable } from "rxjs/Observable";
import {IMetaJSONBlock} from "../../csmp/Block";

@Injectable()
export class ServerService {

	private http:Http;
	private url = "http://localhost:9000/csmp";

	constructor(http:Http) {
		this.http = http;
	}

	getMetaBlocks():Observable<IMetaJSONBlock[]> {
		let t = this.http.get("http://localhost:9000/api/csmp/blocks");
		console.log(t);
		return t.map(res => res.json());
	}

	getIntegrationMethods():Observable<IMetaJSONMethod[]> {
		return this.http.get("http://localhost:9000/api/csmp/integrationmethods")
			.map(res => res.json());
	}

	postSimulate(JSONSimulation:IJSONSimulation):Observable<any> {
		let headers = new Headers({
			"Content-Type": "application/json"
		});
		return this.http.post("http://localhost:9000/api/csmp/simulate", JSON.stringify(JSONSimulation), {
				headers: headers
			})
			.map(res => res.json());
	}
}
