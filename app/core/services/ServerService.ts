import {Injectable, Observable} from "angular2/angular2";
import {Http, Response} from "angular2/http";

@Injectable()
export class ServerService {

	private http:Http;
	private url = "http://localhost:9000/csmp";

	constructor(http:Http) {
		this.http = http;
	}

	getBlocks():Observable<Response> {
		return this.http.get("http://localhost:9000/csmp/blocks")
			.map(res => (res as Response).json());
	}
}
