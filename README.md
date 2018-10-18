# MatrixJS
JS Matrix class that supports functions as matrix entries

# Node Matrix Constructor and toString test example
```
> var Mat = require('./MatrixJS');
> var m = new Mat([ [ function() { return 1; }, function() { return 2; } ], [ function() { return 3; }, function() { return 4; }] ]);
> console.log(m.toString());
[ (1) (2) ]
[ (3) (4) ]
```