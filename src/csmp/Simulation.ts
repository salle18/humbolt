"use strict";

import {Block} from "./Block";
import {Dictionary} from "./Dictionary";
import {EmptyBlock} from "./EmptyBlock";
import {IJSONBlock} from "./interfaces/IJSONBlock";
import {ISimulationConfig} from "./interfaces/ISimulationConfig";
import {IJSONSimulation} from "./interfaces/IJSONSimulation";

export class Simulation {
    /**
     * Niz elemenata u simulaciji.
     */
    private blocks:Dictionary<Block>;

    private config:ISimulationConfig = {
        description: "Simulacija 1",
        method: "RungeKuttaIV",
        duration: 10,
        optimizeAsync: true,
        integrationInterval: 0.01
    };

    constructor() {
        this.blocks = new Dictionary<Block>();
    }

    /**
     * Dodaje blok simulaciji.
     * Ako je integrator dodaje ga i u niz integratora.
     *
     * @param block Block koji se dodaje.
     */
    addBlock(block:Block):void {
        block.setSimulation(this);
        let key = this.blocks.add(block);
        block.key = key;
    }

    /**
     * Uklanja blok iz simulacije. Za svaki blok u simulaciji uklanja referencu na ovaj block.
     * Ako je integrator uklanja se i iz niza integratora.
     *
     * @param key Ključ bloka koji se uklanja.
     */
    removeBlock(key:string):void {
        let block = this.blocks.get(key);
        let blocks = this.blocks.getValues();
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].removeReference(block);
        }
        this.blocks.remove(key);
    }

    /**
     * @param key Ključ bloka.
     * @return Blok sa zadatim ključem.
     */
    getBlock(key:string):Block {
        return this.blocks.get(key);
    }

    /**
     * @return Niz elemenata simulacije.
     *
     */
    getBlocks():Block[] {
        return this.blocks.getValues();
    }

    /**
     * Indeks zadatog bloka u simulaciji.
     *
     * @param block Blok simulacije.
     */
    getIndex(block:Block) {
        return this.blocks.getIndex(block);
    }

    /**
     * Čuvamo nazive klasa elemenata, poziciju, parametre i ulaze kao indekse niza.
     * Nema potrebe da čuvamo izlaze jer ćemo ih rekonstruisati iz ulaza.
     *
     * @return Niz json objekata simulacije.
     */
    saveJSON():IJSONSimulation {
        let blocks = this.blocks.getValues().map((block:Block) => {
            return {
                className: block.className,
                params: block.params.map(param => param.value),
                stringParams: block.stringParams.map(stringParam => stringParam.value),
                position: block.position,
                inputs: block.inputs.map((input:Block) => {
                    return input.getIndex();
                }),
                rotation: block.rotation
            };
        });
        return {
            description: this.config.description,
            method: this.config.method,
            integrationInterval: this.config.integrationInterval,
            duration: this.config.duration,
            optimizeAsync: this.config.optimizeAsync,
            blocks: blocks,
            created_at: new Date().toISOString()
        };
    }

    /**
     * @param JSONSimulation JSON element iz koga učitavamo simulaciju.
     * @param blocks Niz instanciranih blokova.
     */
    loadSimulation(JSONSimulation:IJSONSimulation, blocks:Block[]):void {
        this.config.description = JSONSimulation.description;
        this.config.method = JSONSimulation.method;
        this.config.integrationInterval = JSONSimulation.integrationInterval;
        this.config.duration = JSONSimulation.duration;
        this.config.optimizeAsync = JSONSimulation.optimizeAsync;
        this.loadBlocks(JSONSimulation.blocks, blocks);
    }

    /**
     * @param JSONBlocks Niz JSON elemenata koji učitavamo u simulaciju.
     */
    loadBlocks(JSONBlocks:IJSONBlock[], blocks:Block[]):void {

        /**
         * Samo dodajemo blocke u simulaciju.
         */
        for (let i = 0; i < JSONBlocks.length; i++) {
            let JSONBlock = JSONBlocks[i];
            let block = blocks[i];
            block.loadParams(JSONBlock.params);
            block.loadStringParams(JSONBlock.stringParams);
            block.position = JSONBlock.position;
            block.rotation = JSONBlock.rotation;
            this.addBlock(block);
        }

        /**
         * Ponovo prolazimo kroz sve blokove i dodajemo veze.
         */
        for (let i = 0; i < JSONBlocks.length; i++) {
            let JSONBlock = JSONBlocks[i];
            let block = blocks[i];
            /**
             * Rekonstruišemo sve ulaze na bloku i obrnuto na izlaznom blocku rekonstruišemo izlaz.
             */
            for (let j = 0; j < JSONBlock.inputs.length; j++) {
                let index = JSONBlock.inputs[j];
                if (index > -1) {
                    let outputBlock = blocks[index];
                    block.inputs[j] = outputBlock;
                    outputBlock.addOutput(j, block);
                } else {
                    block.inputs[j] = new EmptyBlock();
                }
            }
        }
    }

    /**
     * @return Da li simulacija ima asinhrone blokove.
     */
    isAsync():boolean {
        return this.blocks.getValues().map(block => block.isAsync).reduce((previous, current) => {
            return previous || current;
        }, false);
    }

    /**
     * @return Da li ima blokova u simulaciji.
     */
    isEmpty():boolean {
        return this.blocks.length() === 0;
    }

    /**
     * @return Konfiguracija simulacije.
     */
    getConfig():ISimulationConfig {
        return this.config;
    }

    /**
     * Resetuje konfiguraciju.
     */
    resetConfig():void {
        this.config.method = "RungeKuttaIV";
        this.config.duration = 10;
        this.config.integrationInterval = 0.01;
        this.config.optimizeAsync = true;
    }

    /**
     * Resetuje blokove i konfiguraciju.
     */
    reset():void {
        this.blocks.reset();
        this.resetConfig();
    }

}
