function MatrixFactory () {
}
    
MatrixFactory.createFromDataOffsetSizeStride = function(data, offset, size, stride) {
    return new Matrix(data, offset, size, stride);
}

var createArrayOfZeros = function(length) {
    return Array.apply(null, Array(length)).map(Number.prototype.valueOf,0);
}

var computeStrideFromSize = function(size) {
    var length = 1;
    var stride = new Dimension([]);

    for (var i = 0; i < size.size(); ++i) {
        stride.pushBack(length);
        length *= size.get(i);
    }

    return stride;
}

MatrixFactory.createFromSize = function(size) {
    return MatrixFactory.createFromDataOffsetSizeStride(createArrayOfZeros(size.product()), 0, size, computeStrideFromSize(size));
}


