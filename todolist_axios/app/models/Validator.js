function findIndex(listTask, value) {
    var index = -1;
    listTask.forEach(function(task) {
        if (task.tenTask.toLowerCase() == value.toLowerCase())
            index = 0;
    })
    return index;
}

function Validator() {
    this.kiemTraRong = function(value, spanId, mess) {
        if (value === '') {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.kiemTraTrung = function(listTask, value, spanId, mess) {
        if (findIndex(listTask, value) !== -1) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }
        getEle(spanId).style.display = 'none'
        getEle(spanId).innerHTML = ''
        return true;
    }
}