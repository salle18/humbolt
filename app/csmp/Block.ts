import * as Exception from "./helpers/Exception";
import {Simulation} from "./Simulation";

/**
 * Enum za tipove grupisanje tipova elemenata.
 */
export enum BlockType {
	Generator, Trigonometry, Mathematical, Limiter, External, Other
}

/**
 * Interfejs za izlazni block. Sadrži block i indeks ulaza na izlaznom blocku.
 */
export interface IOutput {
	block: Block;
	targetIndex: number;
}

export interface IPosition {
	top: number;
	left: number;
}

/**
 * Apstraktna klasa Block. Svi csmp blocki moraju biti izvedeni iz ove klase.
 */
export abstract class Block {

	/**
	 * Niz parametara blocka.
	 */
	public params:number[] = [];
	/**
	 * Niz elemenata koji su ulazi u trenutni block.
	 */
	public inputs:Block[] = [];
	/**
	 * Trenutni rezultat izračunavanja blocka.
	 */
	public result:number = 0;
	/**
	 * Niz elemenata koji su izlazi iz trenutnog blocka.
	 */
	public outputs:IOutput[] = [];
	/**
	 * Broj parametara blocka.
	 */
	protected numberOfParams:number = 0;
	/**
	 * Maksimalni broj ulaza u block.
	 */
	protected maxNumberOfInputs:number = 0;
	/**
	 * Pokazuje da li block ima izlaz, samo Quit block nema izlaz.
	 */
	protected hasOutput:boolean = true;
	/**
	 * Svaki block ima referencu na simulaciju u kojoj se nalazi. Neki blocki zahtevaju pristup spoljnoj simulaciji kako bi se izračunali.
	 */
	protected simulation:Simulation = null;
	/**
	 * Memorija blocka.
	 */
	protected memory:number = 0;
	/**
	 * Oznaka blocka.
	 */
	protected sign:string = "";
	/**
	 * Opis blocka.
	 */
	protected description:string = "";

	/**
	 * Da li je block sortiran u nizu sortiranih elemenata u simulaciji.
	 */
	public sorted:boolean = false;
	/**
	 * Tekstualni parametri, svi blocki prihvataju samo numeričke parametre a IoT block prihvata i tekstualne za unos adrese web servisa.
	 */
	public stringParams:string[] = [];
	/**
	 * Da li block izračunava rezulat na serveru.
	 */
	public remote = false;
	/**
	 * Naziv klase. Pošto će se kod minifikovati naziv klase mora da bude string.
	 */
	protected className:string = "Block";

	/**
	 * Top i left koordinate blocka.
	 */
	public position:IPosition = {
		top: 0,
		left: 0
	};

	/**
	 * Da li je block trenutno aktivan.
	 */
	public active:boolean = false;

	/**
	 * Jedinstveni ključ blocka u simulaciji. Koristi se kao id DOM blocka.
	 */
	public key:string = "";


	/**
	 * Inicijalizuje parametre i ulaze.
	 */
	initialize() {
		/**
		 * Svi parametri se na početku postavljaju na 0.
		 */
		for (let i = 0; i < this.numberOfParams; i++) {
			this.params[i] = 0;
		}
		/**
		 * Svi ulazni blocki su na početku prazni blocki sa rezulatom 0.
		 */
		for (let i = 0; i < this.maxNumberOfInputs; i++) {
			this.inputs[i] = new EmptyBlock();
		}
	}

	/**
	 * @return Naziv klase
	 */
	getClassName():string {
		return this.className;
	}

	/**
	 * Svaki block može da se inicijalizuje. Ova metoda se poziva prilikom pokretanja simulacije.
	 */
	init():void {
		return;
	}

	/**
	 * @return Niz parametara
	 */
	getParams():number[] {
		return this.params;
	}

	/**
	 * Izračunavanje rezulata blocka.
	 */
	calculateResult():void {
		return;
	}

	/**
	 * @return Niz ulaznih elemenata.
	 */
	getInputs():Block[] {
		return this.inputs;
	}

	/**
	 * Dodaje block u niz izlaznih elemenata. Pošto jedan block može da bude vezan na više ulaza izlaznog blocka pamtimo i indeks ulaza na izlaznom blocku.
	 * @param targetIndex Indeks ulaza na izlaznom blocku.
	 * @param block Izlazni block.
	 */
	addOutput(targetIndex:number, block:Block):void {
		this.outputs.push({
			block: block,
			targetIndex: targetIndex
		});
	}

	/**
	 * Uklanja block iz niza izlaznih elemenata. Pošto jedan block može da bude vezan na više ulaza izlaznog blocka proveravamo i indeks ulaza na izlaznom blocku.
	 * @param targetIndex Indeks ulaza na izlaznom blocku.
	 * @param block Izlazni block.
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
	 * @param simulation Simulacija u kojoj se block nalazi.
	 */
	setSimulation(simulation:Simulation) {
		this.simulation = simulation;
	}

	/**
	 * @return Simulacija u kojoj se block nalazi.
	 */
	getSimulation():Simulation {
		return this.simulation;
	}

	/**
	 * @return Oznaka blocka.
	 */
	getSign():string {
		return this.sign;
	}

	/**
	 * @return Opis blocka.
	 */
	getDescription():string {
		return this.description;
	}

	/**
	 * @return Opis blocka sa rednim brojem blocka u simulaciji.
	 */
	getIndexDescription():string {
		return (this.simulation.getIndex(this) + 1) + ". " + this.description;
	}

	/**
	 * @return Maksimalni broj ulaznih elemenata.
	 */
	getMaxNumberOfInputs():number {
		return this.maxNumberOfInputs;
	}

	/**
	 * @return Broj parametara.
	 */
	getNumberOfParams():number {
		return this.numberOfParams;
	}

	/**
	 * @return Da li block ima izlaz.
	 */
	getHasOutput():boolean {
		return this.hasOutput;
	}

	/**
	 * @return Redni broj blocka u simulaciji.
	 */
	getIndex() {
		return this.simulation.getIndex(this);
	}

	/**
	 * Uklanja sve reference za block iz niza ulaznih i niza izlaznih elemenata.
	 *
	 * @param block Block za koji uklanjamo reference.
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
	 * @return Da li su svi ulazni blocki prazni ili sortirani u nizu sortiranih elemenata u simulaciji.
	 */
	hasSortedInputs():boolean {
		let sortedInputs = true;
		for (let i = 0; i < this.inputs.length; i++) {
			if (!this.inputs[i].sorted) {
				sortedInputs = false;
			}
		}
		return sortedInputs;
	}

}

/**
 * Klasa za prazan block bez parametara i ulaza.
 * Koristi se kao prazan ulaz na blocku.
 */
export class EmptyBlock extends Block {

	public sorted:boolean = true;

}
