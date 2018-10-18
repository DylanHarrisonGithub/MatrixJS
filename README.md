# MatrixJS
JS Matrix class that supports functions as matrix entries

# Node getters and setters test example
```
> var MatrixJS = require('./MatrixJS');
> var m = new MatrixJS([ [ function() { return 1; }, function() { return 2; } ], [ function() { return 3; }, function() { return 4; }] ]);
> m.getHeight();
2
> m.getWidth();
2
> m.getRow(0);
[ { f: [Function], string: '(1)' },
  { f: [Function], string: '(2)' } ]
> m.getCol(1);
[ { f: [Function], string: '(2)' },
  { f: [Function], string: '(4)' } ]
> m.getEntry(0,1);
{ f: [Function], string: '(2)' }
> m.setEntry(0,0, function() { return 2*x+1; });
> m.getEntry(0,0);
{ f: [Function], string: '(2*x+1)' }
```
