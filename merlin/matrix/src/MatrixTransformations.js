var slice = function(matrix, dimensionBegin, dimensionEnd) {
    return sliceWithStride(matrix, dimensionBegin, dimensionEnd, 1);
}

var sliceWithStride = function(matrix, dimensionBegin, dimensionEnd, stride) {
    var size = dimensionEnd.subtract(dimensionBegin).divide(stride);

    var dataBeginOffset = matrix.getOffset(dimensionBegin);
    
    return new Matrix(matrix.getData(), dataBeginOffset, size,
                      matrix.getStride().multiply(stride));
}
