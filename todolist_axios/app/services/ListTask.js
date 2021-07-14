function DanhSachTasks() {}

DanhSachTasks.prototype.getTaskApi = function() {
    return axios({
        url: 'https://60e023f06b689e001788c900.mockapi.io/task',
        method: 'GET',
    })
}

DanhSachTasks.prototype.addTaskApi = function(task) {
    return axios({
        url: 'https://60e023f06b689e001788c900.mockapi.io/task',
        method: 'POST',
        data: task,
    })
}

DanhSachTasks.prototype.deleteTaskApi = function(id) {
    return axios({
        url: `https://60e023f06b689e001788c900.mockapi.io/task/${id}`,
        method: 'DELETE',
    })
}


DanhSachTasks.prototype.updateTaskApi = function(id, task) {
    return axios({
        url: `https://60e023f06b689e001788c900.mockapi.io/task/${id}`,
        method: 'PUT',
        data: task,
    })
}