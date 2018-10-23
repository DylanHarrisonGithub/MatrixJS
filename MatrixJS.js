var MatrixJS = {

    VectorFN: function(v) {

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
    },

    MatrixFN: function(m) {
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
            this._row.push(new MatrixJS.VectorFN(row));
        }
        // generate matrix columns
        for (var j = 0; j < this._width; j++) {
            var column = [];
            for (var i = 0; i < this._height; i++) {
                column.push(m[i][j]);
            }
            this._col.push(new MatrixJS.VectorFN(column));
        }
    
        this.getHeight = function() { return this._height; };
        this.getWidth = function() { return this._width; };
        this.getRow = function(i) { return ((i > -1 && i < this._height ) ? this._row[i].v : null); };
        this.getCol = function(j) { return ((j > -1 && j < this._width ) ? this._col[j].v : null); };
        this.getEntry = function(i,j) { return (((i > -1 && i < this._height ) && (j > -1 && j < this._width )) ?  this._row[i].v[j] : null); };
        this.setEntry = function(i,j,f) {
            if ((i > -1 && i < this._height ) && (j > -1 && j < this._width )) {
                this._row[i].v[j] = {
                    'f': f, 
                    'string': '(' + f.toString().match(/return\s*(.*?)\s*;/)[1] + ')'
                };
                this._col[j].v[i] = {
                    'f': f, 
                    'string': '(' + f.toString().match(/return\s*(.*?)\s*;/)[1] + ')'
                };
            }
        }
    
        // [this]*[m2]
        this.mul = function(m2) {
            // compatible matrices check
            if (this._width == m2._height) {
                // == m2.width*this.height
                // generate result matrix
                var mArray = [];
                for (var i = 0; i < this._height; i++) {
                    mArray.push([]);
                    for (var j = 0; j < m2._width; j++) {
                        mArray[i].push( function() { return 0; } );
                    }
                }
                var r = new MatrixJS.MatrixFN(mArray);
                // fill result entries
                for (var j = 0; j < r._width; j++) {
                    for (var i = 0; i < r._height; i++) {
                        var d = this._row[i].dot(m2._col[j]);
                        r.setEntry(i,j,d.f);
                        r._row[i].v[j].string = d.string;
                        r._col[j].v[i].string = d.string;
                    }
                }
                return r;            
            } else {
                return null;
            }
        }
        
        this.toString = function() {
            var s = '';
            for (var i = 0; i < this._height; i++) {
                s += this._row[i].toString() + '\n';
            }
            return s;
        }
    
    }
    
};
module.exports = MatrixJS;