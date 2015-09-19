var binaryOp = function(left, right, op) {
    assert left.size() == right.size()
    var result = MatrixFactory.createFromSize(left.size());
    binaryOpInPlace(result, left, right, op);
    return result;
}

var binaryOpInPlace = function(result, left, right, op) {
    var count = left.elements();

    for (var i = 0; i < count; ++i) {
        result.set(i, op(left.get(i), right.get(i)));
    }
}

var unaryOp = function(left, op) {
    var result = MatrixFactory.createFromSize(left.size());
    unaryOpInPlace(result, left, op);
}

var unaryOpInPlace = function(result, left, op) {
    var count = left.elements();

    for (var i = 0; i < count; ++i) {
        result.set(i, op(left.get(i)));
    }
}

