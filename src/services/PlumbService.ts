import "sporritt/jsPlumb";
import {Injectable, NgZone} from "@angular/core";
import {SimulationService} from "./SimulationService";
import {Block} from "../csmp/Block";
import {EmptyBlock} from "../csmp/EmptyBlock";

@Injectable()
export class PlumbService {

    private instance:jsPlumbInstance = null;

    constructor(private simulationService:SimulationService, private zone:NgZone) {
        jsPlumb.ready(() => {
            this.createInstance();
            this.bindEvents();
        });
    }

    createInstance():void {
        this.instance = jsPlumb.getInstance({
            Container: "csmp-canvas"
        });
    }

    getInstance():jsPlumbInstance {
        return this.instance;
    }

    removeBlock(key:string):void {
        this.instance.detachAllConnections(key, {
            fireEvent: false
        });
        this.instance.removeAllEndpoints(key);
        this.instance.detach(key);
    }

    reset() {
        this.instance.reset();
        this.createInstance();
        this.bindEvents();
    }

    resetConnections() {
        this.simulationService.emptyOutputs();
        let blocks = this.simulationService.getBlocks();
        for (let i = 0; i < blocks.length; i++) {
            let inputs = blocks[i].inputs;
            for (let j = 0; j < inputs.length; j++) {
                let inputBlock = inputs[j];
                if (!(inputBlock instanceof EmptyBlock)) {
                    this.getInstance().connect({uuids: [inputBlock.getEndpointUuid(0, true), blocks[i].getEndpointUuid(j)]});
                }
            }
        }
    }

    bindEvents():void {

        /**
         * connectionMoved ne obezbeđuje parametre stare konekcije zato ovde pamtimo stari index.
         */
        let oldIndex = 0;

        this.instance.bind("beforeDrop", (info) => {
            /**
             * Pamtimo stari parametar index.
             */
            oldIndex = info.connection.getParameter("index");

            return true;
        });

        this.instance.bind("connection", (info) => {
            let sourceBlock:Block = this.simulationService.getBlock(info.sourceId);
            let targetBlock:Block = this.simulationService.getBlock(info.targetId);
            let index = info.connection.getParameter("index");
            this.zone.run(() => {
                targetBlock.inputs[index] = sourceBlock;
                sourceBlock.addOutput(index, targetBlock);
            });
        });

        this.instance.bind("connectionDetached", (info) => {
            let sourceBlock:Block = this.simulationService.getBlock(info.sourceId);
            let targetBlock:Block = this.simulationService.getBlock(info.targetId);
            let index = info.connection.getParameter("index");
            this.zone.run(() => {
                targetBlock.inputs[index] = new EmptyBlock();
                sourceBlock.removeOutput(index, targetBlock);
            });
        });

        this.instance.bind("connectionMoved", (info) => {
            let sourceBlock:Block = this.simulationService.getBlock(info.originalSourceId);
            let targetBlock:Block = this.simulationService.getBlock(info.originalTargetId);
            this.zone.run(() => {
                targetBlock.inputs[oldIndex] = new EmptyBlock();
                sourceBlock.removeOutput(oldIndex, targetBlock);
            });
        });
    }

}
