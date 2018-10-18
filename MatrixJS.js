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
    }

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

function MatrixJS(m) {
    // where m is an array of arrays of functions
    // arrays in m are assumed to have the same length
    this._height = m.length;
    this._width = 0;
    if (this._height > 0) { this._width = m[0].length }
    this._row = [];         // matrix as an array of row vectors
    this._col = [];         // matrix as an array of column vectors
    // generate matrix rows
    for (var i = 0; i < this._height; i++) {
        var row = [];
        for (var j = 0; j < this._width; j++) {
            row.push(m[i][j]);
        }
        this._row.push(new Vector(row));
    }
    // generate matrix columns
    for (var j = 0; j < this._width; j++) {
        var column = [];
        for (var i = 0; i < this._height; i++) {
            column.push(m[i][j]);
        }
        this._col.push(new Vector(column));
    }
    
    this.toString = function() {
        var s = '';
        for (var i = 0; i < this._height; i++) {
            s += this._row[i].toString() + '\n';
        }
        return s;
    }

}
module.exports = MatrixJS;