function Dimension() {
    this.dimensions = []

    this.product = function() {
        var count = 1;
        for (i in this.dimensions) {
            count *= i;
        }
        return count;
    }

    this.subtract = function(right) {
        var result = new Dimension();

        for(var i = 0; i < result.size(); ++i) {
            result.pushBack(i, this.get(i) - right.get(i));
        }

        return result;
    }

    this.pushBack = function(element) {
        this.dimensions[this.size()] = element;
    }

    this.size = function() {
        return this.dimensions.length;
    }
}


