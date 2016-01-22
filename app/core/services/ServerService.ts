import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import {IJSONSimulation} from "../../csmp/Simulation";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ServerService {

	private http:Http;
	private url = "http://localhost:9000/csmp";

	constructor(http:Http) {
		this.http = http;
	}

	//getMetaBlocks():Observable<Response> {
	//	return this.http.get("http://localhost:9000/api/csmp/blocks")
	//		.map(res => (res as Response).json());
	//}
	//
	//getIntegrationMethods():Observable<Response> {
	//	return this.http.get("http://localhost:9000/api/csmp/integrationmethods")
	//		.map(res => (res as Response).json());
	//}
	//
	//postSimulate(JSONSimulation:IJSONSimulation):Observable<Response> {
	//	let headers = new Headers({
	//		"Content-Type": "application/json"
	//	});
	//	return this.http.post("http://localhost:9000/api/csmp/simulate", JSON.stringify(JSONSimulation), {
	//			headers: headers
	//		})
	//		.map(res => (res as Response).json());
	//}
}
