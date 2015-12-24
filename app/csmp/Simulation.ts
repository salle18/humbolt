import {Block, IPosition} from "./Block";
import * as Exception from "./helpers/Exception";
import {IntegrationMethod} from "./IntegrationMethod";
import * as IntegrationMethodDefinitions from "./IntegrationMethodDefinitions";
import {Dictionary} from "./helpers/Dictionary";
import * as BlockDefinitions from "./BlockDefinitions";

/**
 * JSON format u kome se čuvaju blocki simulacije i koji se šalje serveru.
 */
interface IJSONBlock {
	className: string;
	position: IPosition;
	params: number[];
	stringParams: string[];
	inputs: number[];
}

export class Simulation {
	/**
	 * Niz elemenata u simulaciji.
	 */
	private blocks:Dictionary<Block>;
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
	private sorted:Block[] = [];
	/**
	 * Svi rezultati simulacije.
	 */
	private results:number[][] = [];
	/**
	 * Niz integratora.
	 */
	public integrators:BlockDefinitions.Integrator[] = [];

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
		if (block instanceof BlockDefinitions.Integrator) {
			this.integrators.push(block);
		}
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
		if (block instanceof BlockDefinitions.Integrator) {
			let index = this.integrators.indexOf(block);
			this.integrators.splice(index, 1);
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
			this.initBlocks();
			/**
			 * Sortiramo blocke po njihovim ulazima.
			 */
			this.sortBlocks();
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
	 * Izračunava rezulatate za sve blocke.
	 */
	setResults():void {
		let blocks = this.sorted;
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].calculateResult();
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
		let blocks = this.sorted;
		for (let i = 0; i < blocks.length; i++) {
			results.push(blocks[i].result);
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
		if (this.blocks.getValues().length === 0) {
			throw new Exception.Simulation("Simulacija mora da ima najmanje jedan block.");
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
	 * Indeks zadatog blocka u simulaciji.
	 *
	 * @param block Block simulacije.
	 */
	getIndex(block:Block) {
		return this.blocks.getIndex(block);
	}

	/**
	 * Inicijalizacija elemenata. Rezultati se postavljaju na 0 a zatim se poziva init svakog blocka.
	 */
	initBlocks():void {
		let blocks = this.blocks.getValues();
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].result = 0;
			blocks[i].init();
		}
	}

	/**
	 * Sortira blocke iz niza elemenata.
	 * Konstante, integratori i unitDelay se odmah sortiraju jer je rezulat izračunavanja poznat iz prethodnog intervala(previousValue). Ostali blocki moraju da imaju sve sortirane ulaze da bi se sortirali.
	 */
	sortBlocks() {
		this.sorted.length = 0;
		let numberOfSorted = 0;
		let blocks = this.blocks.getValues();
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].sorted = false;
			this.sorted.push(blocks[i]);
		}
		let finished = false;
		while (numberOfSorted < this.sorted.length && !finished) {
			finished = true;
			for (let i = numberOfSorted; i < this.sorted.length; i++) {
				let block = this.sorted[i];
				if (block instanceof BlockDefinitions.Integrator || block instanceof BlockDefinitions.Constant || block.hasSortedInputs()) {
					let temp = this.sorted[numberOfSorted];
					this.sorted[numberOfSorted] = block;
					block.sorted = true;
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
	hasRemoteBlocks():boolean {
		let hasRemote = false;
		let blocks = this.blocks.getValues();
		for (let i = 0; i < blocks.length; i++) {
			if (blocks[i].remote) {
				hasRemote = true;
			}
		}
		return hasRemote;
	}

	/**
	 * Čuvamo nazive klasa elemenata, poziciju, parametre i ulaze kao indekse niza.
	 * Nema potrebe da čuvamo izlaze jer ćemo ih rekonstruisati iz ulaza.
	 *
	 * @return Niz json objekata simulacije.
	 */
	saveJSON():string {
		let result = this.blocks.getValues().map((block:Block) => {
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
		return JSON.stringify(result);
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
			let block = new BlockDefinitions[className];
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
		this.sorted.length = 0;
		this.results.length = 0;
		this.integrators.length = 0;
		this.timer = 0;
		this.duration = 0;
		this.integrationInterval = 0;
	}

}
