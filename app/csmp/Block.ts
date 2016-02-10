"use strict";

import {Simulation} from "./Simulation";
import {EmptyBlock} from "./EmptyBlock";

import {Rotation} from "./enums/Rotation";

import {IParam} from "./interfaces/IParam";
import {IOutput} from "./interfaces/IOutput";
import {IPosition} from "./interfaces/IPosition";
import {IMetaJSONBlock} from "./interfaces/IMetaJSONBlock";

/**
 * Apstraktna klasa Block. Svi csmp blokovi moraju biti izvedeni iz ove klase.
 */
export class Block {

	/**
	 * Niz parametara bloka.
	 */
	public params:IParam<number>[] = [];

	/**
	 * Niz elemenata koji su ulazi u trenutni blok.
	 */
	public inputs:Block[] = [];

	/**
	 * Niz elemenata koji su izlazi iz trenutnog bloka.
	 */
	public outputs:IOutput[] = [];

	/**
	 * Broj parametara bloka.
	 */
	protected numberOfParams:number = 0;
	/**
	 * Broj tekstualnih parametara bloka.
	 */
	protected numberOfStringParams:number = 0;

	/**
	 * Maksimalni broj ulaza u blok.
	 */
	protected maxNumberOfInputs:number = 0;

	/**
	 * Pokazuje da li blok ima izlaz, samo Quit blok nema izlaz.
	 */
	protected hasOutput:boolean = true;

	/**
	 * Svaki blok ima referencu na simulaciju u kojoj se nalazi. Neki blokovi zahtevaju pristup spoljnoj simulaciji kako bi se izračunali.
	 */
	protected simulation:Simulation = null;

	/**
	 * Oznaka bloka.
	 */
	public sign:string = "";

	/**
	 * Opis bloka.
	 */
	protected description:string = "";

	/**
	 * Tekstualni parametri, svi blokovi prihvataju samo numeričke parametre a IoT block prihvata i tekstualne za unos adrese web servisa(username, password).
	 */
	public stringParams:IParam<string>[] = [];

	/**
	 * Naziv klase. Pošto će se kod minifikovati naziv klase mora da bude string.
	 */
	public className:string = "Block";

	/**
	 * Top i left koordinate bloka.
	 */
	public position:IPosition = {
		top: 0,
		left: 0
	};

	/**
	 * Da li je blok trenutno aktivan.
	 */
	public active:boolean = false;

	/**
	 * Da li je blok asinhron.
	 */
	public isAsync:boolean = false;

	/**
	 * Jedinstveni ključ bloka u simulaciji. Koristi se kao id DOM blocka.
	 */
	public key:string = "";

	protected paramDescription:string[] = [];

	protected stringParamDescription:string[] = [];

	public rotation:Rotation = Rotation.Top;


	/**
	 * Inicijalizuje parametre i ulaze.
	 */
	initialize() {
		/**
		 * Svi parametri se na početku postavljaju na 0.
		 */
		for (let i = 0; i < this.numberOfParams; i++) {
			this.params[i] = {
				description: this.paramDescription[i],
				value: 0
			};
		}
		/**
		 * Svi tekstualni parametri se na početku postavljaju na prazan string.
		 */
		for (let i = 0; i < this.numberOfStringParams; i++) {
			this.stringParams[i] = {
				description: this.stringParamDescription[i],
				value: ""
			};
		}
		/**
		 * Svi ulazni blokovi su na početku prazni blokovi sa rezulatom 0.
		 */
		for (let i = 0; i < this.maxNumberOfInputs; i++) {
			this.inputs[i] = new EmptyBlock();
		}
	}

	/**
	 * Dodaje blok u niz izlaznih elemenata. Pošto jedan blok može da bude vezan na više ulaza izlaznog bloka pamtimo i indeks ulaza na izlaznom bloku.
	 * @param targetIndex Indeks ulaza na izlaznom bloku.
	 * @param block Izlazni blok.
	 */
	addOutput(targetIndex:number, block:Block):void {
		this.outputs.push({
			block: block,
			targetIndex: targetIndex
		});
	}

	/**
	 * Uklanja blok iz niza izlaznih elemenata. Pošto jedan blok može da bude vezan na više ulaza izlaznog bloka proveravamo i indeks ulaza na izlaznom bloku.
	 * @param targetIndex Indeks ulaza na izlaznom bloku.
	 * @param block Izlazni blok.
	 */
	removeOutput(targetIndex:number, block:Block):void {
		for (let i = 0; i < this.outputs.length; i++) {
			if (this.outputs[i].block === block && this.outputs[i].targetIndex === targetIndex) {
				this.outputs.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * Postavlja referencu simulacije.
	 * @param simulation Simulacija u kojoj se blok nalazi.
	 */
	setSimulation(simulation:Simulation) {
		this.simulation = simulation;
	}

	/**
	 * @param descrption Opis ukoliko ne postoji simulacija ili ne postoji opis bloka.
	 * @return Opis blocka sa rednim brojem bloka u simulaciji.
	 */
	getIndexDescription(description:string = ""):string {
		if (this.simulation && this.description) {
			return this.getBasedIndex() + ". " + this.description;
		}
		return description;
	}

	/**
	 * @return Da li blok ima izlaz.
	 */
	getHasOutput():boolean {
		return this.hasOutput;
	}

	/**
	 * @return Redni broj bloka u simulaciji.
	 */
	getIndex() {
		return this.simulation.getIndex(this);
	}

	/**
	 * Uklanja sve reference za blok iz niza ulaznih i niza izlaznih elemenata.
	 *
	 * @param block Blok za koji uklanjamo reference.
	 */
	removeReference(block:Block):void {
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i] === block) {
				this.inputs[i] = new EmptyBlock();
			}
		}
		let i = this.outputs.length;
		while (i--) {
			if (this.outputs[i].block === block) {
				this.outputs.splice(i, 1);
			}
		}
	}

	/**
	 * Učitavamo sve parametre iz prostog niza brojeva.
	 */
	loadParams(params:number[]):void {
		params.forEach((param, i) => this.params[i].value = param);
	}

	/**
	 * Učitavamo sve tekstualne parametre iz prostog niza stringova.
	 */
	loadStringParams(params:string[]):void {
		params.forEach((param, i) => this.stringParams[i].value = param);
	}

	/**
	 * Učitavamo sve podatke iz meta JSON objekta u blok.
	 */
	loadMetaJSON(MetaJSONBlock:IMetaJSONBlock):void {
		for (let key in MetaJSONBlock) {
			if (this.hasOwnProperty(key)) {
				this[key] = MetaJSONBlock[key];
			}
		}
	}

	/**
	 * @return Jedinstveni ključ za endpoint na bloku.
	 */
	getEndpointUuid(index:number, output?:boolean):string {
		if (output) {
			return this.key + "_o" + index;
		}
		return this.key + "_i" + index;
	}

	/**
	 * Rotira element u zadatom smeru.
	 */
	rotate(direction:string):void {
		let amount = direction === "Right" ? 1 : -1;
		this.rotation = Rotation[Rotation[(this.rotation + amount + 4) % 4]];
	}

	/**
	 * @return Indeks elementa sa bazom 1.
	 */
	getBasedIndex():number {
		return this.getIndex() + 1;
	}

}
