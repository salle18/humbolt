import {Injectable} from "@angular/core";
import IEditor = AceAjax.Editor;
import {ServerService} from "./ServerService";
import {MessageService} from "./MessageService";
import {ApiType} from "./ServerService";
import {IGpssSimulation} from "../gpss/interfaces/IGpssSimulation";


@Injectable()
export class GpssAppService {

    private editor:IEditor = null;
    private resultsEditor:IEditor = null;
    public simulations:IGpssSimulation[] = [];

    private simulation:IGpssSimulation = {
        data: "",
        description: "Simulacija 1",
        created_at: new Date().toISOString()
    };

    constructor(private serverService:ServerService, private messageService:MessageService) {
    }

    setEditor(editor:IEditor, isReadonly:boolean):void {
        isReadonly ? this.resultsEditor = editor : this.editor = editor;
    }

    getSimulation():IGpssSimulation {
        return this.simulation;
    }

    reset():void {
        if (this.editor) {
            this.editor.setValue("");
            this.resultsEditor.setValue("");
            this.editor.focus();
        }
    }

    listSimulations():void {
        this.serverService.setApiType(ApiType.GPSS).listSimulations<any>()
            .map(res => res.gpssSimulations)
            .subscribe(
                simulations => {
                    this.simulations.length = 0;
                    this.simulations.push.apply(this.simulations, simulations);
                },
                error => this.messageService.handleError(error)
            );
    }

    loadSimulation(id:string):void {

        this.serverService.setApiType(ApiType.GPSS).loadSimulation<IGpssSimulation>(id).subscribe(
            simulation => {
                this.editor.setValue(simulation.data);
                this.simulation.description = simulation.description;
                this.simulation.created_at = simulation.created_at;
                this.simulation.data = simulation.data;
            },
            error => this.messageService.handleError(error)
        );
    }

    removeSimulation(id:string):void {
        this.serverService.setApiType(ApiType.GPSS).removeSimulation<IGpssSimulation>(id).subscribe(
            simulation => {
                this.messageService.success("Simulation deleted...");
                this.listSimulations();
            }, error => this.messageService.handleError(error)
        );
    }

    save():void {
        this.simulation.data = this.editor.getValue();
        this.serverService.setApiType(ApiType.GPSS).saveSimulation<IGpssSimulation>(this.simulation)
            .subscribe(
                simulation => this.messageService.success("Simulation saved..."),
                error => this.messageService.handleError(error)
            );
    }

    run():void {
        this.simulation.data = this.editor.getValue();
        this.messageService.loader();
        this.serverService.setApiType(ApiType.GPSS).postSimulation<IGpssSimulation, Object>(this.simulation)
            .subscribe(
                results => {
                    this.messageService.hideLoader();
                    this.resultsEditor.setValue(JSON.stringify(results, null, "\t"));
                },
                error => {
                    this.messageService.hideLoader();
                    this.messageService.handleError(error);
                }
            );
    }
}
