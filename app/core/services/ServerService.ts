import {Injectable} from "angular2/core";
import {IJSONSimulation, IMetaJSONMethod} from "../../csmp/Simulation";
import {Observable} from "rxjs/Observable";
import {HttpService} from "./HttpService";
import {IMetaJSONBlock} from "../../csmp/interfaces/IMetaJSONBlock";

@Injectable()
export class ServerService {

	private api = "http://localhost:9000/api/csmp";

	constructor(private httpService:HttpService) {
	}

	getMetaBlocks():Observable<IMetaJSONBlock[]> {
		return this.httpService.get<IMetaJSONBlock[]>(this.api + "/blocks");
	}

	getIntegrationMethods():Observable<IMetaJSONMethod[]> {
		return this.httpService.get<IMetaJSONMethod[]>(this.api + "/integrationmethods");
	}

	postSimulation(JSONSimulation:IJSONSimulation):Observable<number[][]> {
		return this.httpService.post<number[][]>(this.api + "/simulate", JSONSimulation);
	}

	listSimulations():Observable<IJSONSimulation[]> {
		return this.httpService.get<any>(this.api + "/simulation").map(res => res.csmpSimulations);
	}

	saveSimulation(JSONSimulation:IJSONSimulation):Observable<IJSONSimulation> {
		return this.httpService.post<IJSONSimulation>(this.api + "/simulation", JSONSimulation);
	}

	loadSimulation(id:string):Observable<IJSONSimulation> {
		return this.httpService.get<IJSONSimulation>(this.api + "/simulation/" + id);
	}

	removeSimulation(id:string):Observable<IJSONSimulation> {
		return this.httpService.delete(this.api + "/simulation/" + id);
	}
}
