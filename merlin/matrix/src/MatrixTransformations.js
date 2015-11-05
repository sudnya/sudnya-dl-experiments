
var getDimensionOfOnesWithLength = function(length) {
    var dimension = new Dimension([]);

    for (var i = 0; i < length; ++i) {
        dimension.pushBack(1);
    }
        
    return dimension;
}

var slice = function(matrix, dimensionBegin, dimensionEnd) {
    return sliceWithStride(matrix, dimensionBegin, dimensionEnd, getDimensionOfOnesWithLength(dimensionBegin.size()));
}

var sliceWithStride = function(matrix, dimensionBegin, dimensionEnd, stride) {
    var size            = (dimensionEnd.subtract(dimensionBegin)).divideRoundUp(stride);
    var dataBeginOffset = matrix.dimensionToLinear(dimensionBegin);
    
    return new Matrix(matrix.getData(), matrix.getDataBegin() + dataBeginOffset, size, matrix.getStride().multiply(stride));
}

