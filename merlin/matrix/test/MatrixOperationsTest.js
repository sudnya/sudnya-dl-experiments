QUnit.module( "Matrix.js Tests" );
QUnit.test( "Matrix: Get Elements ", function( assert ) {
    var matrix1 = new Matrix([0, 0], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    assert.ok(matrix1.getElements() == 2, "Get elements passed" );
});

QUnit.test( "Matrix: Get Dimensions ", function( assert ) {
    var matrix1 = new Matrix([0, 0], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    assert.ok(matrix1.getDimension().equals(new Dimension([1,2])), "Get dimensions passed" );
});


QUnit.module( "MatrixOperations.js Tests" );
QUnit.test( "Matrix Unary Operation", function( assert ) {
    var matrix1 = new Matrix([1, 1], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var result  = new Matrix([2, 2], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    // set everything to 0
    unaryOpInPlace(matrix1, matrix1, function(value) { return value * 2; } );
    assert.ok(matrix1.equals(result), "Unary op passed" );
});

QUnit.test( "Matrix Binary Operation", function( assert ) {
    var matrix1   = new Matrix([1, 1], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var matrix2   = new Matrix([2, 2], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var matrix3   = new Matrix([0, 0], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var reference = new Matrix([3, 3], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    
    // Matrix addition
    binaryOpInPlace(matrix3, matrix1, matrix2, function(v1, v2) { return v1+v2; } );
    
    
    assert.ok(reference.equals(matrix3), "Binary op passed" );
});

QUnit.test( "Matrix Binary Operation Out Of Place", function( assert ) {
    var matrix1   = new Matrix([1, 1], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var matrix2   = new Matrix([2, 2], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var reference = new Matrix([3, 3], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    
    // Matrix addition
    var result = binaryOp(matrix1, matrix2, function(v1, v2) { return v1+v2; } );
    
    assert.ok(reference.equals(result), "Binary op passed" );
});

