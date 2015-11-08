//void gemm(Matrix& result, const Matrix& left, const Matrix& right);
var gemmInPlace = function(result, left, right) {
    gemmWithTransposeWithParamsInPlace(result, 0.0, left, false, 1.0, right, false);
}

//Matrix gemm(const Matrix& left, const Matrix& right);
var gemm = function(left, right) {
    assert(left.getDimension().equals(right.getDimension()));
    var result = MatrixFactory.createFromSize(left.getDimension());
    gemmInPlace(result, left, right);
    return result;
}

//void gemm(Matrix& result, const Matrix& left, bool transposeLeft, const Matrix& right, bool transposeRight);
var gemmWithTransposeInPlace = function(result, left, isTransposeLeft, right, isTransposeRight) {
    gemmWithTransposeWithParamsInPlace(result, 0.0, left, isTransposeLeft, 1.0, right, isTransposeRight);
}


//Matrix gemm(const Matrix& left, bool transposeLeft, const Matrix& right, bool transposeRight);
var gemmWithTranspose = function(left, isTransposeLeft, right, isTransposeRight) {
    assert(left.getDimension().equals(right.getDimension()));
    var result = MatrixFactory.createFromSize(left.getDimension());
    gemmWithTransposeInPlace(result, left, isTransposeLeft, right, isTransposeRight);
    return result;
}

//void gemm(Matrix& result, double beta, const Matrix& left, bool transposeLeft, double alpha, const Matrix& right, bool transposeRight);
var gemmWithTransposeWithParamsInPlace = function(result, beta, left, isTransposeLeft, alpha, right, isTransposeRight) {
    assert(left.getDimension().size() == 2);
    assert(right.getDimension().size() == 2);
    assert(result.getDimension().size() == 2);
    
    assert(result.getDimension().get(0) == isTransposeLeft  ? left.getDimension().get(1)  : left.getDimension().get(0));
    assert(result.getDimension().get(1) == isTransposeRight ? right.getDimension().get(0) : right.getDimension().get(1));

    var innerDimensionLeft  = isTransposeLeft  ? left.getDimension().get(0) : left.getDimension().get(1);
    var innerDimensionRight = isTransposeRight ? right.getDimension().get(1) : right.getDimension().get(0);

    assert(innerDimensionLeft == innerDimensionRight);

    var outputRows    = result.getDimension().get(0);
    var outputColumns = result.getDimension().get(1);
    
    for (var i = 0 ; i < outputRows; ++i) {
        for (var j = 0 ; j < outputColumns; ++j) {
            
            var resultDimension = new Dimension([i, j]);
            
            var val = result.get(resultDimension) * beta;
            for (var k = 0; k < innerDimensionLeft; ++k) {
                var leftDimension   = new Dimension(isTransposeRight ? [k, i] : [i, k]);
                var rightDimension  = new Dimension(isTransposeLeft  ? [j, k] : [k, j]);
            
                val += left.get(leftDimension) * right.get(rightDimension) * alpha;
            }
            
            result.set(resultDimension, val);
        }
    }
}

//Matrix gemm(const Matrix& left, bool transposeLeft, double alpha, const Matrix& right, bool transposeRight);
var gemmWithTransposeWithParams = function(left, isTransposeLeft, alpha, right, isTransposeRight) {
    assert(left.getDimension().equals(right.getDimension()));
    var result = MatrixFactory.createFromSize(left.getDimension());
    gemmWithTransposeWithParamsInPlace(result, 0.0, left, isTransposeLeft, alpha, right, isTransposeRight);
    return result;
}
