# MatrixJS
JS Matrix class that supports functions as matrix entries
---
# Node Command line Vector test example
```
> var Vector = require('./MatrixJS');
> var x = 1;
> var y = 2;
> var i = 3;
> var j = 4;
> var v = new Vector( [ function() { return x+5; }, function() { return y-1; } ] );
> var v2 = new Vector( [ function() { return i+1; }, function() { return 2*j+1; } ] );
> var dotProduct = v.dot(v2);
> dotProduct;
{ f: [Function], string: '((x+5)(i+1) + (y-1)(2*j+1))' }
> dotProduct.f();
33
> j = 5;
5
> dotProduct.f();
35
```