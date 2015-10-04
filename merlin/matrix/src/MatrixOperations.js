var binaryOp = function(left, right, op) {
    
    assert(left.getDimension().equals(right.getDimension()));

    var result = MatrixFactory.createFromSize(left.getDimension());
    binaryOpInPlace(result, left, right, op);
    return result;
}

var binaryOpInPlace = function(result, left, right, op) {
    var count = left.getElements();

    for (var i = 0; i < count; ++i) {
        var dimension = left.linearToDimension(i);
        result.set(dimension, op(left.get(dimension), right.get(dimension)));
    }
}

var unaryOp = function(left, op) {
    var result = MatrixFactory.createFromSize(left.getDimension());
    unaryOpInPlace(result, left, op);
    return result;
}

var unaryOpInPlace = function(result, left, op) {
    var count = left.getElements();

    for (var i = 0; i < count; ++i) {
        var dimension = left.linearToDimension(i);
        result.set(dimension, op(left.get(dimension)));
    }
}

