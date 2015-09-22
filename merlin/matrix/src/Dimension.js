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
        var result = new Dimension();

        for (var i = 0; i < result.size(); ++i) {
            result.pushBack(i, this.get(i) - right.get(i));
        }

        return result;
    }

    this.multiply = function(right) {
        assert (this.size() == right.size());
        for (var i = 0; i < this.size(); ++i) {
            this.dimensions[i] = this.dimensions[i] * right.dimensions[i];
        }
    }

    this.pushBack = function(element) {
        this.dimensions[this.size()] = element;
    }

    this.size = function() {
        return this.dimensions.length;
    }

    this.get = function(index) {
        assert (index > -1);
        assert (index < this.size);
        return this.dimension[i];
    }
}


