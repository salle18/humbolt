import {Element} from "./Element";
import * as Exception from "./helpers/Exception";
import {IntegrationMethod} from "./IntegrationMethod";
import * as IntegrationMethodDefinitions from "./IntegrationMethodDefinitions";
import {Dictionary} from "./helpers/Dictionary";
import {Integrator, Constant} from "./ElementDefinitions";

export class Simulation {
	/**
	 * Niz elemenata u simulaciji.
	 */
	private elements:Dictionary<Element>;
	/**
	 * Trenutno vreme izvršavanja simulacije.
	 */
	private timer:number = 0;
	/**
	 * Trajanje simulacije.
	 */
	private duration:number = 0;
	/**
	 * Interval integracije.
	 */
	private integrationInterval:number = 0;
	/**
	 * Niz sortiranih elemenata simulacije.
	 */
	private sorted:Element[] = [];
	/**
	 * Svi rezultati simulacije.
	 */
	private results:number[][] = [];
	/**
	 * Niz integratora.
	 */
	public integrators:Integrator[] = [];

	constructor() {
		this.elements = new Dictionary<Element>();
	}

	/**
	 * Dodaje element simulaciji.
	 * Ako je integrator dodaje ga i u niz integratora.
	 *
	 * @param element Element koji se dodaje.
	 */
	addElement(element:Element):string {
		element.setSimulation(this);
		if (element instanceof Integrator) {
			this.integrators.push(element);
		}
		return this.elements.add(element);
	}

	/**
	 * Uklanja element iz simulacije. Za svaki element u simulaciji uklanja referencu na ovaj element.
	 * Ako je integrator uklanja se i iz niza integratora.
	 *
	 * @param key Ključ elementa koji se uklanja.
	 */
	removeElement(key:string):void {
		let element = this.elements.get(key);
		let elements = this.elements.getValues();
		for (let i = 0; i < elements.length; i++) {
			elements[i].removeReference(element);
		}
		if (element instanceof Integrator) {
			let index = this.integrators.indexOf(element);
			this.integrators.splice(index, 1);
		}
		this.elements.remove(key);
	}

	/**
	 * @param key Ključ elementa.
	 * @return Element sa zadatim ključem.
	 */
	getElement(key:string):Element {
		return this.elements.get(key);
	}

	/**
	 * @return Niz elemenata simulacije.
	 *
	 */
	getElements():Element[] {
		return this.elements.getValues();
	}

	/**
	 * @return Ključ zadatog elementa.
	 */
	getKey(element:Element):string {
		return this.elements.getKey(element);
	}

	/**
	 * @return Niz ključeva elemenata simulacije.
	 */
	getKeys():string[] {
		return this.elements.getKeys();
	}

	/**
	 * Pokretanje simulacije.
	 *
	 * @param method Naziv klase metode simulacije.
	 * @param integrationInterval Interval integracije.
	 * @param duration Trajanje simulacije.
	 */
	run(method:string, integrationInterval:number, duration:number):void {
		/**
		 * Restujemo niz rezultata. Postavljamo interval i trajanje i resetujemo vreme.
		 */
		this.results.length = 0;
		this.duration = duration;
		this.integrationInterval = integrationInterval;
		this.timer = 0;
		/**
		 * Pravimo instancu metode integracije i prosleđujemo trenutno instancu simulacije kao parametar.
		 */
		let integrationMethod:IntegrationMethod = new IntegrationMethodDefinitions[method](this);
		try {
			/**
			 * Pre pokretanja integracije vršimo sve provere.
			 */
			this.preRunCheck();
			/**
			 * Resetujemo rezultate elemenata i inicijalizujemo ih.
			 */
			this.initElements();
			/**
			 * Sortiramo elemente po njihovim ulazima.
			 */
			this.sortElements();
			/**
			 * Pokrećemo metodu integracije.
			 */
			integrationMethod.run();
		} catch (e) {
			/**
			 * Ukoliko je nastala greška tipa QuitSimulation nije došlo do nepredviđenog izuzetka već je simulacija završena dolaskom do Quit bloka.
			 */
			if (!(e instanceof Exception.QuitSimulation)) {
				throw e;
			}
		}
	}

	/**
	 * Izračunava rezulatate za sve elemente.
	 */
	setResults():void {
		let elements = this.sorted;
		for (let i = 0; i < elements.length; i++) {
			elements[i].calculateResult();
		}
		/**
		 * Za sve integratore ponovo pozivamo calculateResult kako bi se izračunao novi rezultat.
		 */
		for (let i = 0; i < this.integrators.length; i++) {
			this.integrators[i].calculateResult();
		}
	}

	/**
	 * @return Trenutni rezultati svih elemenata.
	 */
	getResults():number[] {
		let results:number[] = [this.getTimer()];
		let elements = this.sorted;
		for (let i = 0; i < elements.length; i++) {
			results.push(elements[i].result);
		}
		return results;
	}

	/**
	 * Čuva trenutne rezultate.
	 */
	saveResults():void {
		this.results.push(this.getResults());
	}

	/**
	 * @return Svi rezultati simulacije.
	 */
	getSimulationResults():number[][] {
		return this.results;
	}

	/**
	 * Provera parametara simulacije pre pokretanja.
	 */
	preRunCheck():void {
		if (!(this.duration > 0)) {
			throw new Exception.Simulation("Dužina simulacije mora biti veća od nule.");
		}
		if (!(this.integrationInterval > 0)) {
			throw new Exception.Simulation("Interval integracije mora biti veća od nule.");
		}
		if (this.duration < this.integrationInterval) {
			throw new Exception.Simulation("Dužina simulacije mora biti veća od intervala integracije.");
		}
		if (this.elements.getValues().length === 0) {
			throw new Exception.Simulation("Simulacija mora da ima najmanje jedan element.");
		}
	}

	/**
	 * @return Trenutno vreme izvršavanja simulacije.
	 */
	getTimer():number {
		return this.timer;
	}

	/**
	 * Povećava timer za zadati deo intervala integracije.
	 *
	 * @param times Koliko delova intervala integracije.
	 */
	incrementInterval(times:number):void {
		this.timer += times * this.integrationInterval;
	}

	/**
	 * @return Trajanje simulacije.
	 */
	getDuration():number {
		return this.duration;
	}

	/**
	 * Postavlja trajanje simulacije.
	 *
	 * @param duration Trajanje simulacije.
	 */
	setDuration(duration:number):void {
		this.duration = duration;
	}

	/**
	 * @return Interval integracije.
	 */
	getIntegrationInterval():number {
		return this.integrationInterval;
	}

	/**
	 * Postavlja interval integracije.
	 *
	 * @param integrationInterval Interval integracije.
	 */
	setIntegrationInterval(integrationInterval:number):void {
		this.integrationInterval = integrationInterval;
	}

	/**
	 * Indeks zadatog elementa u simulaciji.
	 *
	 * @param element Element simulacije.
	 */
	getIndex(element:Element) {
		return this.elements.getIndex(element);
	}

	/**
	 * Inicijalizacija elemenata. Rezultati se postavljaju na 0 a zatim se poziva init svakog elementa.
	 */
	initElements():void {
		let elements = this.elements.getValues();
		for (let i = 0; i < elements.length; i++) {
			elements[i].result = 0;
			elements[i].init();
		}
	}

	/**
	 * Sortira elemente iz niza elemenata.
	 * Konstante, integratori i unitDelay se odmah sortiraju jer je rezulat izračunavanja poznat iz prethodnog intervala(previousValue). Ostali elementi moraju da imaju sve sortirane ulaze da bi se sortirali.
	 */
	sortElements() {
		this.sorted.length = 0;
		let numberOfSorted = 0;
		let elements = this.elements.getValues();
		for (let i = 0; i < elements.length; i++) {
			elements[i].sorted = false;
			this.sorted.push(elements[i]);
		}
		let finished = false;
		while (numberOfSorted < this.sorted.length && !finished) {
			finished = true;
			for (let i = numberOfSorted; i < this.sorted.length; i++) {
				let element = this.sorted[i];
				if (element instanceof Integrator || element instanceof Constant || element.hasSortedInputs()) {
					let temp = this.sorted[numberOfSorted];
					this.sorted[numberOfSorted] = element;
					element.sorted = true;
					this.sorted[i] = temp;
					numberOfSorted++;
					finished = false;
				}
			}
		}
	}

	/**
	 * @return Da li u simulaciji ima elemenata koji se izračunavaju na serverskoj strani.
	 */
	hasRemoteElements():boolean {
		let hasRemote = false;
		let elements = this.elements.getValues();
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].remote) {
				hasRemote = true;
			}
		}
		return hasRemote;
	}

	/**
	 * Resetuje sve nizove i brojače.
	 */
	reset():void {
		this.elements.reset();
		this.sorted.length = 0;
		this.results.length = 0;
		this.integrators.length = 0;
		this.timer = 0;
		this.duration = 0;
		this.integrationInterval = 0;
	}

}
