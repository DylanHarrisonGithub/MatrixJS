function Vector(v) {

	this.v = [];
	for (var i = 0; i < v.length; i++) {
		this.v.push({
            'f': v[i], 
            'string': '(' + v[i].toString().match(/return\s*(.*?)\s*;/)[1] + ')'}); //match return statement
	}

    //dot product
	this.dot = function(v2) {
		if (v2.v.length == this.v.length) {
            var s = function() { return 0; };
            var sString = '(';
			for (var i = 0; i < this.v.length; i++) {
				s = this._addProductToFunction(s, this.v[i].f, v2.v[i].f);
                sString += this.v[i].string + v2.v[i].string;
                if (i < this.v.length-1) {
                    sString += ' + ';
                }
            }
            sString += ')';
			return {'f': s, 'string': sString};
		} else {
			return null;
		}
	};

	this.toString = function() {
		var s = '[ ';
		for (var i = 0; i < this.v.length; i++) {
			s += this.v[i].string + ' ';
		}
		s += ']';
		return s;		
    }
    
    //return new function f1 + f2*f3
    this._addProductToFunction = function(f1,f2,f3) {
        return function() { return f1() + f2()*f3(); };
    }

}

var MatrixJS = (function() {
    //this.v = new Vector(f);
});
module.exports = Vector;