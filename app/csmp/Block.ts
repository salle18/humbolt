import * as Exception from "./helpers/Exception";
import {Simulation} from "./Simulation";

export enum Rotation {Top, Right, Bottom, Left}

/**
 * Enum za tipove grupisanje tipova elemenata.
 */
export enum BlockType {
	Generator, Trigonometry, Mathematical, Limiter, External, Other
}

/**
 * Interfejs za parametre i string parametre.
 */
export interface IParam<T> {
	description: string;
	value: T;
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
 * JSON format u kome se čuvaju blocki simulacije i koji se šalje serveru.
 */
export interface IJSONBlock {
	className: string;
	position: IPosition;
	params: number[];
	stringParams: string[];
	inputs: number[];
	rotation: number;
}

/**
 * JSON format u kome se čuvaju meta podaci o bloku.
 */
export interface IMetaJSONBlock {
	className: string;
	numberOfParams: number;
	numberOfStringParams: number;
	maxNumberOfInputs: number;
	hasOutput:boolean;
	sign: string;
	description: string;
	info: string;
	paramDescription: string[];
	stringParamDescription: string[];
	isAsync: boolean;
}

/**
 * Apstraktna klasa Block. Svi csmp blocki moraju biti izvedeni iz ove klase.
 */
export class Block {

	/**
	 * Niz parametara blocka.
	 */
	public params:IParam<number>[] = [];

	/**
	 * Niz elemenata koji su ulazi u trenutni block.
	 */
	public inputs:Block[] = [];

	/**
	 * Niz elemenata koji su izlazi iz trenutnog blocka.
	 */
	public outputs:IOutput[] = [];

	/**
	 * Broj parametara blocka.
	 */
	protected numberOfParams:number = 0;
	/**
	 * Broj tekstualnih parametara blocka.
	 */
	protected numberOfStringParams:number = 0;

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
	 * Oznaka blocka.
	 */
	protected sign:string = "";

	/**
	 * Opis blocka.
	 */
	protected description:string = "";

	/**
	 * Tekstualni parametri, svi blocki prihvataju samo numeričke parametre a IoT block prihvata i tekstualne za unos adrese web servisa.
	 */
	public stringParams:IParam<string>[] = [];

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
	 * Da li je block asinhron.
	 */
	public isAsync:boolean = false;

	/**
	 * Jedinstveni ključ blocka u simulaciji. Koristi se kao id DOM blocka.
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
	getParams():IParam<number>[] {
		return this.params;
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
	 * @param descrption Opis ukoliko ne postoji simulacija ili ne postoji opis bloka.
	 * @return Opis blocka sa rednim brojem blocka u simulaciji.
	 */
	getIndexDescription(description:string = ""):string {
		if (this.simulation && this.description) {
			return (this.simulation.getIndex(this) + 1) + ". " + this.description;
		}
		return description;
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

	loadParams(params:number[]):void {
		params.forEach((param, i) => this.params[i].value = param);
	}

	loadStringParams(params:string[]):void {
		params.forEach((param, i) => this.stringParams[i].value = param);
	}

	/**
	 * Učitavamo sve podatke iz meta JSON objekta u blok.
	 *
	 */
	loadMetaJSON(MetaJSONBlock:IMetaJSONBlock):void {
		for (let key in MetaJSONBlock) {
			if (this.hasOwnProperty(key)) {
				this[key] = MetaJSONBlock[key];
			}
		}
	}

	getEndpointUuid(index:number, output?:boolean):string {
		if (output) {
			return this.key + "_o" + index;
		}
		return this.key + "_i" + index;
	}

	rotate(direction:string):void {
		let amount = direction === "Right" ? 1 : -1;
		this.rotation = Rotation[Rotation[(this.rotation + amount + 4) % 4]];
	}

	getBasedIndex():number {
		return this.getIndex() + 1;
	}

}

/**
 * Klasa za prazan block bez parametara i ulaza.
 * Koristi se kao prazan ulaz na blocku.
 */
export class EmptyBlock extends Block {

	public sorted:boolean = true;

	getIndex():number {
		return -1;
	}

}
