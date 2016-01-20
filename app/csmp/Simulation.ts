import {Block, IJSONBlock, IPosition} from "./Block";
import {Dictionary} from "./helpers/Dictionary";

export interface IJSONSimulation {
	method: string;
	duration: number;
	integrationInterval: number;
	blocks: IJSONBlock[];
}

export interface IMetaJSONMethod {
	className: string;
	description: string;
}

export class Simulation {
	/**
	 * Niz elemenata u simulaciji.
	 */
	private blocks:Dictionary<Block>;

	/**
	 * Metoda simulacije.
	 */
	private method:string = "";

	/**
	 * Trajanje simulacije.
	 */
	private duration:number = 0;

	/**
	 * Interval integracije.
	 */
	private integrationInterval:number = 0;

	constructor() {
		this.blocks = new Dictionary<Block>();
	}

	/**
	 * Dodaje block simulaciji.
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
	 * Uklanja block iz simulacije. Za svaki block u simulaciji uklanja referencu na ovaj block.
	 * Ako je integrator uklanja se i iz niza integratora.
	 *
	 * @param key Ključ blocka koji se uklanja.
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
	 * @param key Ključ blocka.
	 * @return Block sa zadatim ključem.
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
	 * @return Ključ zadatog blocka.
	 */
	getKey(block:Block):string {
		return this.blocks.getKey(block);
	}

	/**
	 * @return Niz ključeva elemenata simulacije.
	 */
	getKeys():string[] {
		return this.blocks.getKeys();
	}

	/**
	 * @return Metoda simulacije.
	 */
	getMethod():string {
		return this.method;
	}

	/**
	 * Postavlja metodu simulacije.
	 *
	 * @param method Metoda simulacije.
	 */
	setMethod(method:string):void {
		this.method = method;
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
	 * Indeks zadatog blocka u simulaciji.
	 *
	 * @param block Block simulacije.
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
				className: block.getClassName(),
				params: block.params,
				stringParams: block.stringParams,
				position: block.position,
				inputs: block.inputs.map((input:Block) => {
					return input.getIndex();
				})
			};
		});
		return {
			method: this.method,
			integrationInterval: this.integrationInterval,
			duration: this.duration,
			blocks: blocks
		};
	}

	/**
	 * @param JSONBlocks Niz JSON elemenata koji učitavamo u simulaciju.
	 */
	loadJSON(JSONBlocks:IJSONBlock[]):void {
		/**
		 * Pre učitavanja elemenata resetujemo simulaciju.
		 */
		this.reset();
		/**
		 * Samo dodajemo blocke u simulaciju.
		 */
		for (let i = 0; i < JSONBlocks.length; i++) {
			let JSONBlock = JSONBlocks[i];
			let className = JSONBlock.className;
			let block = new Block();
			block.params = JSONBlock.params;
			block.stringParams = JSONBlock.stringParams;
			block.position = JSONBlock.position;
			let id = this.addBlock(block);
			//todo jsplumb canvas append block
		}

		let blocks = this.blocks.getValues();

		/**
		 * Ponovo prolazimo kroz sve blocke i dodajemo veze.
		 */
		for (let i = 0; i < JSONBlocks.length; i++) {
			let JSONBlock = JSONBlocks[i];
			let block = blocks[i];
			/**
			 * Rekonstruišemo sve ulaze na blocku i obrnuto na izlaznom blocku rekonstruišemo izlaz.
			 */
			for (let j = 0; j < JSONBlock.inputs.length; j++) {
				let outputBlock = blocks[JSONBlock.inputs[j]];
				block.inputs[j] = outputBlock;
				outputBlock.addOutput(j, block);
				//todo jsplumb connect blocks
			}
		}
	}

	/**
	 * Resetuje sve nizove i brojače.
	 */
	reset():void {
		this.blocks.reset();
		this.duration = 0;
		this.integrationInterval = 0;
	}

}
