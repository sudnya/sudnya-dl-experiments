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

var broadcast = function(left, right, op) {
    var missingDimensions = getMissingDimension(left, right);
    var totalElements     = left.getElements();

    var result = MatrixFactory.createFromSize(left.getDimension());

    for (var i = 0 ; i < totalElements; ++i) {
        var leftPos  = left.linearToDimension(i);
        var rightPos = removeMissingDimensions(leftPos, missingDimensions);

        result.set(leftPos, op(left.get(leftPos), right.get(rightPos)))
    }
        
    return result;
}

var removeMissingDimensions = function(leftDims, missingDims) {
    var retVal = new Dimension([]);
    for (var i = 0; i < leftDims.size(); ++i) {
        if (!missingDims.contains(i)) {
            retVal.pushBack(leftDims.get(i));
        }
    }
    return retVal;
}


var getMissingDimension = function(left, right) {
    var leftDim  = left.getDimension();
    var rightDim = right.getDimension();

    assert (leftDim >= rightDim)

    var missingDim = new Dimension([])
    var i = 0;
    var j = 0;
    
    while (i < leftDim.size() && j < rightDim.size()) {
        if (leftDim.get(i) == rightDim.get(j)) {
            ++i;
            ++j;
        } else {
            missingDim.pushBack(i);
            ++i;
        }
    }

    while (i < leftDim.size()) {
        missingDim.pushBack(i);
        ++i;
    }

    assert(j == rightDim.size());

    return missingDim;
}
