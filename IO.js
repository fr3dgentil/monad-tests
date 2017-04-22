class IO {
	constructor(effect){
		this.effect = effect;
	}
	static of(a){
		return new IO( () => a );
	}
	static from(fn){
		return new IO(fn);
	}
	map(fn){
		return new IO( () => fn( this.effect() ));
	}
	run(){return this.effect();}
}