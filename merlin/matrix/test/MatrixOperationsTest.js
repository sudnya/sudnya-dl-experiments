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
QUnit.test( "Matrix Unary Operation In Place", function( assert ) {
    var matrix1   = new Matrix([1, 1], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var reference = new Matrix([2, 2], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    // set everything to 0
    unaryOpInPlace(matrix1, matrix1, function(value) { return value * 2; } );
    assert.ok(reference.equals(matrix1), "Unary op in place passed" );
});

QUnit.test( "Matrix Unary Operation", function( assert ) {
    var matrix1   = new Matrix([1, 1], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var reference = new Matrix([2, 2], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    // set everything to 0
    var result    = unaryOp(matrix1, function(value) { return value * 2; } );
    console.log(result.getDimension());
    assert.ok(reference.equals(result), "Unary op passed" );
});

QUnit.test( "Matrix Binary Operation In Place", function( assert ) {
    var matrix1   = new Matrix([1, 1], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var matrix2   = new Matrix([2, 2], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var matrix3   = new Matrix([0, 0], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var reference = new Matrix([3, 3], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    
    // Matrix addition
    binaryOpInPlace(matrix3, matrix1, matrix2, function(v1, v2) { return v1+v2; } );
    assert.ok(reference.equals(matrix3), "Binary op in place passed" );
});

QUnit.test( "Matrix Binary Operation", function( assert ) {
    var matrix1   = new Matrix([1, 1], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var matrix2   = new Matrix([2, 2], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    var reference = new Matrix([3, 3], 0, new Dimension([1,2]), new Dimension([1, 1])); 
    // Matrix addition
    var result = binaryOp(matrix1, matrix2, function(v1, v2) { return v1+v2; } );
    assert.ok(reference.equals(result), "Binary op passed" );
});

QUnit.test( "Matrix Broadcast Operation", function( assert ) {
    var matrix1 = MatrixFactory.createFromSizeAndData(new Dimension([3,3]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var matrix2 = MatrixFactory.createFromSizeAndData(new Dimension([3]), [1, 2, 3]);

    var reference = MatrixFactory.createFromSizeAndData(new Dimension([3,3]), [2, 4, 6, 5, 7, 9, 8, 10, 12]);
    
    var result = broadcast(matrix1, matrix2, function(v1, v2) { return v1 + v2; });

    assert.ok(reference.equals(result), "Broadcast op passed" );
});

//1,4,7  -> 8 
//2,5,8  -> 9
//3,6,9  ->
QUnit.module( "MatrixTransformation.js Tests" );
QUnit.test( "Matrix Slice", function( assert ) {
    var matrix1   = MatrixFactory.createFromSizeAndData(new Dimension([3,3]), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    var reference = MatrixFactory.createFromSizeAndData(new Dimension([2,1]), [8, 9]);
    
    // Matrix addition
    var result = slice(matrix1, new Dimension([1, 2]), new Dimension([3, 3]));

    assert.ok(reference.equals(result), "Slice op passed" );
});

//1,5,9   -> 10 
//2,6,10  -> 12
//3,7,11 
//4,8,12
QUnit.test( "Matrix Slice with stride", function( assert ) {
    var matrix1   = MatrixFactory.createFromSizeAndData(new Dimension([4,3]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    var reference = MatrixFactory.createFromSizeAndData(new Dimension([2,1]), [10, 12]);
    
    // Matrix addition
    var result = sliceWithStride(matrix1, new Dimension([1, 2]), new Dimension([4, 3]), new Dimension([2,2]));

    assert.ok(reference.equals(result), "Slice with stride op passed" );
});

//1,4    
//2,5 => 21
//3,6 
QUnit.test( "Matrix Reduce", function( assert ) {
    var matrix1   = MatrixFactory.createFromSizeAndData(new Dimension([3,2]), [1, 2, 3, 4, 5, 6]);
    var reference = MatrixFactory.createFromSizeAndData(new Dimension([1]), [21]);
    
    // Matrix addition
    var result = reduce(matrix1, new Dimension([]), function(v1, v2) { return v1+v2; } );

    assert.ok(reference.equals(result), "Reduce op 2D -> scalar passed" );
});

//1,4    5
//2,5 => 7
//3,6    9
QUnit.test( "Matrix Reduce", function( assert ) {
    var matrix1   = MatrixFactory.createFromSizeAndData(new Dimension([3,2]), [1, 2, 3, 4, 5, 6]);
    var reference = MatrixFactory.createFromSizeAndData(new Dimension([3]), [5,7,9]);
    
    // [0] <- [0, 0] -- [1, 2]
    // [1] <- [1, 0] -- [2, 2]
    // [2] <- [2, 0] -- [3, 2]
    //
    // Matrix addition
    var result = reduce(matrix1, new Dimension([1]), function(v1, v2) { return v1+v2; } );

    assert.ok(reference.equals(result), "Reduce op 2D -> 1D 0th dimension passed" );
});

//1,4    6
//2,5 => 15
//3,6 
QUnit.test( "Matrix Reduce", function( assert ) {
    var matrix1   = MatrixFactory.createFromSizeAndData(new Dimension([3,2]), [1, 2, 3, 4, 5, 6]);
    var reference = MatrixFactory.createFromSizeAndData(new Dimension([2]), [6, 15]);
    
    // Matrix addition
    // [0] <- [0, 0] -- [3, 1]  ====>>>>> start [0,0] - size [3, 1]
    // [1] <- [0, 1] -- [3, 2]  ====>>>>> start [0,1] - size [3, 1]
    var result = reduce(matrix1, new Dimension([0]), function(v1, v2) { return v1+v2; } );

    assert.ok(reference.equals(result), "Reduce op 2D -> 1D 1th dimension passed" );
});


