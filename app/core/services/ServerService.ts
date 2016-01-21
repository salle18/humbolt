import {Injectable, Observable} from "angular2/angular2";
import {Http, Response} from "angular2/http";
import {IJSONSimulation} from "../../csmp/Simulation";

@Injectable()
export class ServerService {

	private http:Http;
	private url = "http://localhost:9000/csmp";

	constructor(http:Http) {
		this.http = http;
	}

	getMetaBlocks():Observable<Response> {
		return this.http.get("http://localhost:9000/csmp/blocks")
			.map(res => (res as Response).json());
	}

	getIntegrationMethods():Observable<Response> {
		return this.http.get("http://localhost:9000/csmp/integrationmethods")
			.map(res => (res as Response).json());
	}

	postSimulate(JSONSimulation:IJSONSimulation):Observable<Response> {
		return this.http.post("http://localhost:9000/csmp/simulate", JSON.stringify(JSONSimulation))
			.map(res => (res as Response).json());
	}
}
