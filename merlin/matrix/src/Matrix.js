function Matrix (dataBody, beginOffset, matrixDimension, stride) {
   this.data            = dataBody;
   this.dataBegin       = beginOffset;
   this.matrixDimension = matrixDimension;
   this.stride          = stride;

   this.getDimension = function() {
       return this.matrixDimension;
   };

   this.getStride= function() {
       return this.stride;
   };

    this.getElements = function() {
        return this.matrixDimension.product();
    }   

    this.getData = function() {
        return this.data;
    }

    this.getDataBegin = function() {
        return this.dataBegin;
    }

    this.get = function(i) {
        var linear = this.dimensionToLinear(i);

        return this.data[this.dataBegin + linear];
    }

    this.set = function(i, v) {
        var linear = this.dimensionToLinear(i);

        this.data[this.dataBegin + linear] = v;
    }

    this.linearToDimension = function(linear) {
        var dimension = new Dimension([]);

        for (var i = 0; i < this.getDimension().size(); ++i) {
            dimension.pushBack(linear % this.getDimension().get(i));
            linear = Math.floor(linear / this.getDimension().get(i));
        }

        return dimension;
    }

    this.dimensionToLinear = function(dimension) {
        var linear = 0;

        for (var i = 0; i < this.getDimension().size(); ++i) {
            linear += dimension.get(i) * this.getStride().get(i);
        }

        return linear;
    }

    this.equals = function(that) {
        if (!this.getDimension().equals(that.getDimension())) {
            return false;
        }
        for (var i = 0; i < this.getElements(); ++i) {
            var dimension = this.linearToDimension(i);
            if (this.get(dimension) != that.get(dimension)) {
                return false;
            }
        }

        return true;
        /*
        var equalElements = binaryOp(this, that, function(left, right) { return left == right; } );

        return reduce(equalElements, [], function(left, right) { return left && right; } ).get(0);
       */
    }

}

