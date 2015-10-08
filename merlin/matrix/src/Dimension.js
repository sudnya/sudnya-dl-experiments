function Dimension(contents) {
    this.dimensions = contents

    this.product = function() {
        var count = 1;
        for (i in this.dimensions) {
            count *= this.dimensions[i];
        }
        return count;
    }

    this.subtract = function(right) {
        var result = new Dimension([]);

        for (var i = 0; i < this.size(); ++i) {
            result.pushBack(this.get(i) - right.get(i));
        }

        return result;
    }

    this.add = function(right) {
        var result = new Dimension([]);

        for (var i = 0; i < this.size(); ++i) {
            result.pushBack(this.get(i) + right.get(i));
        }

        return result;
    }

    this.multiply = function(right) {
        var result = new Dimension([]);
        assert (this.size() == right.size());
        for (var i = 0; i < this.size(); ++i) {
            result.pushBack(this.dimensions[i] * right.dimensions[i]);
        }
        
        return result;
    }

    this.divide = function(right) {
        var result = new Dimension([]);
        assert (this.size() == right.size());
        for (var i = 0; i < this.size(); ++i) {
            result.pushBack(Math.floor(this.dimensions[i] / right.dimensions[i]));
        }
        
        return result;
    }

    this.divideRoundUp = function(right) {
        var result = new Dimension([]);
        assert (this.size() == right.size());
        for (var i = 0; i < this.size(); ++i) {
            result.pushBack(Math.floor((this.dimensions[i] + right.dimensions[i] - 1) / right.dimensions[i]));
        }
        
        return result;
    }

    this.pushBack = function(element) {
        this.dimensions[this.size()] = element;
    }

    this.size = function() {
        return this.dimensions.length;
    }

    this.get = function(index) {
        assert (index > -1);
        assert (index < this.size());
        return this.dimensions[index];
    }

    this.equals = function(that) {
        var retVal = true;
        if (this.size() != that.size()) {
            retVal = false;
        }
        for (var i = 0; i < this.size(); ++i) {
            if (this.get(i) != that.get(i)) {
                retVal = false;
            }
        }
        return retVal;
    }

    this.contains = function(value) {
        for (var i = 0; i < this.size(); ++i) {
            if (this.get(i) == value) {
                return true;
            }
        }

        return false;
    }
}


