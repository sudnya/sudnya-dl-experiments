QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.module( "group a" );
QUnit.test( " Dimension ", function( assert ) {
    var matrix1 = new Matrix([0, 0], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    assert.ok(matrix1.getElements() == 2, "Get elements passed" );
});
QUnit.test( "a basic test example 2", function( assert ) {
  assert.ok( true, "this test is fine" );
});

