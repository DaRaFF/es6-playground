// First run 'npm run build' to compile es6 to es5
// Then run 'node example.js'
var slug = require('./lib/Library.min.js');

console.log(slug.normalize('normalize me'))
console.log(slug.normalize('normalize some special character like äääöööüü'))
