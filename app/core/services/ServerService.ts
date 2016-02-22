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
        return this.api + ApiType[this.apiType].toLowerCase();
    }

    getMetaBlocks():Observable<IMetaJSONBlock[]> {
        return this.httpService.get<IMetaJSONBlock[]>(this.getApi() + "/blocks");
    }

    getIntegrationMethods():Observable<IMetaJSONMethod[]> {
        return this.httpService.get<IMetaJSONMethod[]>(this.getApi() + "/integrationmethods");
    }

    postSimulation<T, Y>(simulation:T):Observable<Y> {
        return this.httpService.post<Y>(this.getApi() + "/simulate", simulation);
    }

    listSimulations<T>():Observable<T> {
        return this.httpService.get<any>(this.getApi() + "/simulation");
    }

    saveSimulation<T>(simulation:T):Observable<T> {
        return this.httpService.post<T>(this.getApi() + "/simulation", simulation);
    }

    loadSimulation<T>(id:string):Observable<T> {
        return this.httpService.get<T>(this.getApi() + "/simulation/" + id);
    }

    removeSimulation<T>(id:string):Observable<T> {
        return this.httpService.delete(this.getApi() + "/simulation/" + id);
    }
}
