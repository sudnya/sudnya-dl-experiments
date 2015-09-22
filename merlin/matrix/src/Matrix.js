function Matrix (dataBody, beginOffset, matrixDimension, stride) {
   this.data            = dataBody;
   this.dataBegin       = beginOffset;
   this.matrixDimension = matrixDimension;
   this.stride          = stride;

   this.getDimension = function() {
       return this.matrixDimension;
   };

    this.getElements = function() {
        return this.matrixDimension.product();
    }   

}

