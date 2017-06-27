console.log('这是订单页');

function* gen() {
  yield 1;
  yield 2;
}

var mm = gen();

console.log(mm.next());
console.log(mm.next())

function foo() {
  console.log(a)
}

function bar() {
  var a = 3;
  foo();
}
var a = 1;
bar();