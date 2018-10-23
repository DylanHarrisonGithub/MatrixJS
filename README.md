# MatrixJS
JS Matrix class that supports functions as matrix entries

# matrix multiplication test example in Node
```
> var MatrixJS = require('./MatrixJS');
> var a = 1;
> var b = 2;
> var c = 3;
> var d = 4;
> var e = 5;
> var f = 6;
> var g = 7;
> var h = 8;
> var m1 = new MatrixJS([ [ function() { return a; }, function() { return b; } ], [ function() { return c; }, function() { return d; }] ]);
> var m2 = new MatrixJS([ [ function() { return e+1; }, function() { return 3*f; } ], [ function() { return g*a; }, function() { return h*h; }] ]);
> m1.toString();
'[ (a) (b) ]\n[ (c) (d) ]\n'
> m2.toString();
'[ (e+1) (3*f) ]\n[ (g*a) (h*h) ]\n'
> var r1 = m1.mul(m2);
> var r2 = m2.mul(m1);
> r1.toString();
'[ ((a)(e+1) + (b)(g*a)) ((a)(3*f) + (b)(h*h)) ]\n[ ((c)(e+1) + (d)(g*a)) ((c)(3*f) + (d)(h*h)) ]\n'
> r2.toString();
'[ ((e+1)(a) + (3*f)(c)) ((e+1)(b) + (3*f)(d)) ]\n[ ((g*a)(a) + (h*h)(c)) ((g*a)(b) + (h*h)(d)) ]\n'
> r1.getEntry(0,1).f();
146
> r2.getEntry(1,1).f();
270
```