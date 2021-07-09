function DanhSachTasks() {
    this.arr = [];
}

DanhSachTasks.prototype.themTask = function(todoTask) {
    this.arr.push(todoTask);
}

DanhSachTasks.prototype.timViTri = function(name) {
    return this.arr.findIndex(function(lt) {
        return name.toLowerCase() == lt.tenTask.toLowerCase();
    })
}

DanhSachTasks.prototype.xoaTask = function(name) {
    var viTri = this.timViTri(name);
    if (viTri !== -1) {
        this.arr.splice(viTri, 1);
    }
}

DanhSachTasks.prototype.capNhatTask = function(name) {
    var viTri = this.timViTri(name);
    if (viTri !== -1) {
        if (this.arr[viTri].trangThai == 'todo') {
            this.arr[viTri].trangThai = 'completed';
        } else {
            this.arr[viTri].trangThai = 'todo';
        }

    }
}