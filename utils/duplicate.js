function isDuplicate(w){
    return new Set(w).size !== w.length ;
};

module.exports = isDuplicate;