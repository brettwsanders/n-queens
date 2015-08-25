var aObject = {'marcus': 'buffett'};
var bObject = {};
for (var key in aObject) {
  bObject[key] = aObject[key];
}
console.log(aObject);
console.log(bObject);
bObject.marcus = 'bob';
console.log(aObject);

