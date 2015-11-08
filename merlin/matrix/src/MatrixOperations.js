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

var reduce = function(matrix, dimensions, op) {
    if (dimensions.empty()) {
        for (var i = 0; i < matrix.getDimension().size(); ++i) {
            dimensions.pushBack(i);
        }
    }

    // result dims = input dims - reduced dims
    var inputDimensions  = matrix.getDimension();
    var resultDimensions = inputDimensions.removeSelectedDimensions(dimensions);

    if (dimensions.size() == inputDimensions.size()) {
        resultDimensions.pushBack(1);
    }

    var output = MatrixFactory.createFromSize(resultDimensions);
    
    var totalElements = output.getElements();

    // iterate over all elements in output    
    for (var i = 0; i < totalElements; ++i) {
        var outputPos = output.linearToDimension(i);
        
        // slice input to reduce over for this output position
        var inputSliceBegin = selectBegin(matrix.getDimension(), dimensions, outputPos)
        var inputSliceEnd   = selectEnd(matrix.getDimension(), dimensions, outputPos)

        var inputSlice = slice(matrix, inputSliceBegin, inputSliceEnd)
        // iterate over each element in slice and apply op
        var resultValue = inputSlice.get(inputSlice.linearToDimension(0));
        
        var inputSliceElements = inputSlice.getElements();

        for (var j = 1; j < inputSliceElements; ++j) {
            var inputPos = inputSlice.linearToDimension(j);

            resultValue = op(resultValue, inputSlice.get(inputPos));
        }

        output.set(outputPos, resultValue);
    }

    return output;
}

var selectBegin = function(matrixSize, reduceDimensions, outputPosition) {
    var resultDims = new Dimension([]);
    var outputDimension = 0;

    for(var i = 0; i < matrixSize.size(); ++i) {
        if(reduceDimensions.contains(i)) {
            resultDims.pushBack(0);
        }
        else {
            resultDims.pushBack(outputPosition.get(outputDimension));
            ++outputDimension;
        }
    }

    return resultDims;
}


var selectEnd = function(matrixSize, reduceDimensions, outputPosition) {
    var resultDims = new Dimension([]);
    var outputDimension = 0;

    for(var i = 0; i < matrixSize.size(); ++i) {
        if(reduceDimensions.contains(i)) {
            resultDims.pushBack(matrixSize.get(i));
        }
        else {
            resultDims.pushBack(outputPosition.get(outputDimension) + 1);
            ++outputDimension;
        }
    }

    return resultDims;
}
