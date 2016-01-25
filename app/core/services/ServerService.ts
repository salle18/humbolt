import {Injectable} from "angular2/core";
import {IJSONSimulation, IMetaJSONMethod} from "../../csmp/Simulation";
import {Observable} from "rxjs/Observable";
import {IMetaJSONBlock} from "../../csmp/Block";
import {HttpService} from "./HttpService";

@Injectable()
export class ServerService {

	private api = "http://localhost:9000/api";

	constructor(private httpService:HttpService) {
	}

	getMetaBlocks():Observable<IMetaJSONBlock[]> {
		return this.httpService.get<IMetaJSONBlock[]>(this.api + "/csmp/blocks");
	}

	getIntegrationMethods():Observable<IMetaJSONMethod[]> {
		return this.httpService.get<IMetaJSONMethod[]>(this.api + "/csmp/integrationmethods");
	}

	postSimulation(JSONSimulation:IJSONSimulation):Observable<number[][]> {
		return this.httpService.post<number[][]>(this.api + "/csmp/simulate", JSONSimulation);
	}

	listSimulations():Observable<IJSONSimulation[]> {
		return this.httpService.get<IJSONSimulation[]>(this.api + "/csmp/simulations");
	}

	saveSimulation(JSONSimulation:IJSONSimulation):Observable<IJSONSimulation> {
		return this.httpService.post(this.api + "/csmp/save", JSONSimulation);
	}
}
