QUnit.module( "BlasOperations.js Tests" );

//1,3     5,15    --> 35,75
//2,4  *  10,20       50,110
QUnit.test( "BlasOperation: Simple 3x3 ", function( assert ) {
    var left      = MatrixFactory.createFromSizeAndData(new Dimension([2,2]), [1, 2, 3, 4]);
    var right     = MatrixFactory.createFromSizeAndData(new Dimension([2,2]), [5, 10, 15, 20]);
    var reference = MatrixFactory.createFromSizeAndData(new Dimension([2,2]), [35, 50, 75, 110]);

    var result    = gemm(left, right);
    assert.ok(reference.equals(result), "BlasOperation for simple 2x2 matrix passed");
});

