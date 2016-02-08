import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {HttpService} from "./HttpService";
import {IMetaJSONBlock} from "../../csmp/interfaces/IMetaJSONBlock";
import {IJSONSimulation} from "../../csmp/interfaces/IJSONSimulation";
import {IMetaJSONMethod} from "../../csmp/interfaces/IMetaJSONMethod";

export enum ApiType {CSMP, GPSS}


@Injectable()
export class ServerService {

	private api = "http://localhost:9000/api/";
	private apiType:ApiType;

	constructor(private httpService:HttpService) {
	}

	setApiType(apiType:ApiType):ServerService {
		this.apiType = apiType;
		return this;
	}

	private getApi():string {
		return this.api + ApiType[this.apiType];
	}

	getMetaBlocks():Observable<IMetaJSONBlock[]> {
		return this.httpService.get<IMetaJSONBlock[]>(this.getApi() + "/blocks");
	}

	getIntegrationMethods():Observable<IMetaJSONMethod[]> {
		return this.httpService.get<IMetaJSONMethod[]>(this.getApi() + "/integrationmethods");
	}

	postSimulation(JSONSimulation:IJSONSimulation):Observable<number[][]> {
		return this.httpService.post<number[][]>(this.getApi() + "/simulate", JSONSimulation);
	}

	listSimulations():Observable<IJSONSimulation[]> {
		return this.httpService.get<any>(this.getApi() + "/simulation").map(res => res.csmpSimulations);
	}

	saveSimulation(JSONSimulation:IJSONSimulation):Observable<IJSONSimulation> {
		return this.httpService.post<IJSONSimulation>(this.getApi() + "/simulation", JSONSimulation);
	}

	loadSimulation(id:string):Observable<IJSONSimulation> {
		return this.httpService.get<IJSONSimulation>(this.getApi() + "/simulation/" + id);
	}

	removeSimulation(id:string):Observable<IJSONSimulation> {
		return this.httpService.delete(this.getApi() + "/simulation/" + id);
	}
}
