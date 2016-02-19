"use strict";

/**
 * Implementacija dictionary klase.
 */
export class Dictionary<T> {

	/**
	 * Ključevi su uvek string. Zbog toga vodimo dva prosta niza jedan ključeva a drugi vrednosti.
	 * Javascript za asocijativne nizove koristi objekte ali je odabrana ovakva implementacija.
	 */
	private keys:string[] = [];
	/**
	 * Niz vrednosti generičkog tipa.
	 */
	private values:T[] = [];
	/**
	 * Brojač ključeva za generisanje jedinstvenog ključa. Uvek se inkrementira i ne može se resetovati.
	 */
	private keyCounter:number = 0;

	/**
	 * @return Jedinstveni ključ.
	 */
	generateKey():string {
		return "e_" + ++this.keyCounter;
	}

	/**
	 * @return Element sa zadatim ključem.
	 */
	get(key:string):T {
		let index = this.keys.indexOf(key);
		return this.values[index];
	}

	/**
	 * Dodaje element i generiše jedinstveni ključ.
	 *
	 * @return Jedinstveni ključ.
	 */
	add(value:T):string {
		let key = this.generateKey();
		this.keys.push(key);
		this.values.push(value);
		return key;
	}

	/**
	 * Uklanja element sa zadatim ključem.
	 */
	remove(key:string):void {
		let index = this.keys.indexOf(key);
		this.keys.splice(index, 1);
		this.values.splice(index, 1);
	}

	/**
	 * @return Niz vrednosti.
	 */
	getValues():T[] {
		return this.values;
	}

	/**
	 * @return Indeks elementa u nizu.
	 */
	getIndex(value:T):number {
		return this.values.indexOf(value);
	}

	/**
	 * Resetuje dictionary, prazni sve nizove i resetuje brojač.
	 */
	reset():void {
		this.keys.length = 0;
		this.values.length = 0;
		this.keyCounter = 0;
	}

	/**
	 * Dužina dictinary.
	 */
	length():number {
		return this.keys.length;
	}

}
