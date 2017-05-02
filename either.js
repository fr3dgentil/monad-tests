var compose = (...fns) => function(val) {
	function r(fns) {
		if (!fns.length) return val;
		else return fns[0](r(fns.slice(1)));
	}
	return r(fns);
}

var a = compose(x => x + 1, x => x + 1);
// console.log(a(2));

class Either {
	constructor(value) {
		this._value = value;
	}
	get value() {
		return this._value;
	}
	static left(a) {
		return new Left(a);
	}
	static right(a) {
		return new Right(a);
	}
	static fromNullable(val) {
		return val ? Either.right(val) : Either.left(val);
	}
	static of (a) {
		return Either.right(a);
	}
}
class Left extends Either {
	map(_) {
		return this;
	}
	get value() {
		throw new TypeError("Can't extract the value of a Left.");
	}
	getOrElse(other) {
		return other;
	}
	orElse(f) {
		return f(this._value);
	}
	chain(_) {
		return this;
	}
	getOrElseThrow(a) {
		throw new Error(a);
	}
	filter(_) {
		return this;
	}
	toString() {
		return `Either.Left(${this.value})`;
	}
}
class Right extends Either {
	map(f) {
		return Either.fromNullable(f(this.value));
	}
	getOrElse(_) {
		return this.value;
	}
	orElse(_) {
		return this;
	}
	chain(f) {
		return f(this.value);
	}
	getOrElseThrow(_) {
		return this.value;
	}
	filter(f) {
		return f(this.value) ? Either.right(this.value) : Either.left(this.value);
	}
	toString() {
		return `Either.Right(${this.value})`;
	}
}

var cl = message => console.log(message);

var isEven = x => x % 2 === 0 ? true : false;

var getDb = x => x === 1 ? Either.right(2) : Either.left('Not found');

cl(
	Either.of(1)
	.chain(getDb)
	.filter(isEven)
	.map(x=>x+1)
	.orElse(x=>x + ' is not even')
);

var map = f => container => container.map(f);

var plusOne = map(x=>++x);

cl( plusOne([1,2,3]) );
