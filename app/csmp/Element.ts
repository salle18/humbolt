import * as Exception from "./helpers/Exception";
import {Simulation} from "./Simulation";

/**
 * Enum za tipove grupisanje tipova elemenata.
 */
export enum ElementType {
	Generator, Trigonometry, Mathematical, Limiter, External, Other
}

/**
 * Interfejs za izlazni element. Sadrži element i indeks ulaza na izlaznom elementu.
 */
export interface IOutput {
	element: Element;
	targetIndex: number;
}

/**
 * Apstraktna klasa Element. Svi csmp elementi moraju biti izvedeni iz ove klase.
 */
export abstract class Element {

	/**
	 * Niz parametara elementa.
	 */
	public params:number[] = [];
	/**
	 * Niz elemenata koji su ulazi u trenutni element.
	 */
	public inputs:Element[] = [];
	/**
	 * Trenutni rezultat izračunavanja elementa.
	 */
	public result:number = 0;
	/**
	 * Niz elemenata koji su izlazi iz trenutnog elementa.
	 */
	public outputs:IOutput[] = [];
	/**
	 * Broj parametara elementa.
	 */
	protected numberOfParams:number = 0;
	/**
	 * Maksimalni broj ulaza u element.
	 */
	protected maxNumberOfInputs:number = 0;
	/**
	 * Pokazuje da li element ima izlaz, samo Quit element nema izlaz.
	 */
	protected hasOutput:boolean = true;
	/**
	 * Svaki element ima referencu na simulaciju u kojoj se nalazi. Neki elementi zahtevaju pristup spoljnoj simulaciji kako bi se izračunali.
	 */
	protected simulation:Simulation = null;
	/**
	 * Memorija elementa.
	 */
	protected memory:number = 0;
	/**
	 * Oznaka elementa.
	 */
	protected sign:string = "";
	/**
	 * Opis elementa.
	 */
	protected description:string = "";

	/**
	 * Da li je element sortiran u nizu sortiranih elemenata u simulaciji.
	 */
	public sorted:boolean = false;
	/**
	 * Tekstualni parametri, svi elementi prihvataju samo numeričke parametre a IoT element prihvata i tekstualne za unos adrese web servisa.
	 */
	public stringParams:string[] = [];
	/**
	 * Da li element izračunava rezulat na serveru.
	 */
	public remote = false;
	/**
	 * Naziv klase. Pošto će se kod minifikovati naziv klase mora da bude string.
	 */
	protected className:string = "Element";

	/**
	 * Top i left koordinate elementa.
	 */
	public top:number = 0;
	public left:number = 0;


	/**
	 * @param numberOfParams Broj parametara elementa.
	 * @param maxNumberOfInputs Maksimalni broj ulaznih elemenata.
	 */
	constructor(numberOfParams:number, maxNumberOfInputs:number) {
		this.numberOfParams = numberOfParams;
		this.maxNumberOfInputs = maxNumberOfInputs;
		/**
		 * Svi parametri se na početku postavljaju na 0.
		 */
		for (let i = 0; i < this.numberOfParams; i++) {
			this.params[i] = 0;
		}
		/**
		 * Svi ulazni elementi su na početku prazni elementi sa rezulatom 0.
		 */
		for (let i = 0; i < this.maxNumberOfInputs; i++) {
			this.inputs[i] = new EmptyElement();
		}
	}

	/**
	 * @return Naziv klase
	 */
	getClassName():string {
		return this.className;
	}

	/**
	 * Svaki element može da se inicijalizuje. Ova metoda se poziva prilikom pokretanja simulacije.
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
	 * Izračunavanje rezulata elementa.
	 */
	calculateResult():void {
		return;
	}

	/**
	 * @return Niz ulaznih elemenata.
	 */
	getInputs():Element[] {
		return this.inputs;
	}

	/**
	 * Dodaje element u niz izlaznih elemenata. Pošto jedan element može da bude vezan na više ulaza izlaznog elementa pamtimo i indeks ulaza na izlaznom elementu.
	 * @param targetIndex Indeks ulaza na izlaznom elementu.
	 * @param element Izlazni element.
	 */
	addOutput(targetIndex:number, element:Element):void {
		this.outputs.push({
			element: element,
			targetIndex: targetIndex
		});
	}

	/**
	 * Uklanja element iz niza izlaznih elemenata. Pošto jedan element može da bude vezan na više ulaza izlaznog elementa proveravamo i indeks ulaza na izlaznom elementu.
	 * @param targetIndex Indeks ulaza na izlaznom elementu.
	 * @param element Izlazni element.
	 */
	removeOutput(targetIndex:number, element:Element):void {
		for (let i = 0; i < this.outputs.length; i++) {
			if (this.outputs[i].element === element && this.outputs[i].targetIndex === targetIndex) {
				this.outputs.splice(i, 1);
				return;
			}
		}
	}

	/**
	 * Postavlja referencu simulacije.
	 * @param simulation Simulacija u kojoj se element nalazi.
	 */
	setSimulation(simulation:Simulation) {
		this.simulation = simulation;
	}

	/**
	 * @return Simulacija u kojoj se element nalazi.
	 */
	getSimulation():Simulation {
		return this.simulation;
	}

	/**
	 * @return Oznaka elementa.
	 */
	getSign():string {
		return this.sign;
	}

	/**
	 * @return Opis elementa.
	 */
	getDescription():string {
		return this.description;
	}

	/**
	 * @return Opis elementa sa rednim brojem elementa u simulaciji.
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
	 * @return Da li element ima izlaz.
	 */
	getHasOutput():boolean {
		return this.hasOutput;
	}

	/**
	 * @return Redni broj elementa u simulaciji.
	 */
	getIndex() {
		return this.simulation.getIndex(this);
	}

	/**
	 * Uklanja sve reference za element iz niza ulaznih i niza izlaznih elemenata.
	 *
	 * @param element Element za koji uklanjamo reference.
	 */
	removeReference(element:Element):void {
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i] === element) {
				this.inputs[i] = new EmptyElement();
			}
		}
		let i = this.outputs.length;
		while (i--) {
			if (this.outputs[i].element === element) {
				this.outputs.splice(i, 1);
			}
		}
	}

	/**
	 * @return Da li su svi ulazni elementi prazni ili sortirani u nizu sortiranih elemenata u simulaciji.
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
 * Klasa za prazan element bez parametara i ulaza.
 * Koristi se kao prazan ulaz na elementu.
 */
export class EmptyElement extends Element {

	public sorted:boolean = true;

	constructor() {
		super(0, 0);
	}
}
