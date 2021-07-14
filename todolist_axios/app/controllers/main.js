var ds = new DanhSachTasks();
var validator = new Validator();

var getEle = function(id) {
        return document.getElementById(id)
    }
    // var isLoading = false;

// var checkLoading = function() {
//     if (isLoading == true)
//         getEle('loading').style.display = 'block';
//     else
//         getEle('loading').style.display = 'none';
// };
// Lấy dữ liệu

var getTask = function() {
    // isLoading = true;
    // checkLoading();
    ds.getTaskApi().then(function(res) {
        // console.log(res.data);
        renderListTask(res.data)
        setLocalStorage(res.data)
            // isLoading = true;
            // checkLoading();
    }).catch(function(err) {
        console.log(err);
    })
}
getTask();
// Render task
var renderListTask = function(ds) {
        var task_todo = '';
        var task_complete = '';
        ds.forEach(function(dstask, index) {
            if (dstask.trangThai == 'todo') {
                task_todo += `
                        <li>
                            <span>${dstask.tenTask}</span>
                            <div class="buttons">
                                <button class="remove" onclick="deleteTask('${dstask.id}')">
                                    <i class="fa fa-trash-alt"></i>
                                </button>
                                <button class="complete" onclick="updateTask('${dstask.id}')">
                                    <i class="far fa-check-circle"></i>
                                    <i class="fas fa-check-circle"></i>
                                </button>
                            </div>
                        </li>

            `

            } else {
                task_complete += `
                        <li>
                            <span>${dstask.tenTask}</span>
                            <div class="buttons">
                                <button class="remove" onclick="deleteTask('${dstask.id}')">
                                    <i class="fa fa-trash-alt"></i>
                                </button>
                                <button class="complete" onclick="updateTask('${dstask.id}')">
                                    <i class="far fa-check-circle"></i>
                                    <i class="fas fa-check-circle"></i>
                                </button>
                            </div>
                        </li>
                        `
            }
        });
        getEle('todo').innerHTML = task_todo;
        getEle('completed').innerHTML = task_complete;
    }
    // Xóa task
var deleteTask = function(id) {
        // isLoading = true;
        // checkLoading();
        ds.deleteTaskApi(id)
            .then(function(res) {
                getTask();
            })
            .catch(function(err) {
                console.log(err);
            })
    }
    // Update task
function updateTask(id) {
    // isLoading = true;
    // checkLoading();
    var listLocal = getLocalStorage();
    var changeTask = new task;
    listLocal.forEach(function(task) {
        if (id == task.id) {
            changeTask.tenTask = task.tenTask;
            if (task.trangThai == 'todo') {
                changeTask.trangThai = 'completed';
            } else {
                changeTask.trangThai = 'todo';
            }

        }
    })
    ds.updateTaskApi(id, changeTask)
        .then(function(res) {
            getTask();
        }).catch(function(err) {
            console.log(err);
        })
}
// Check validator
var validateInput = function(tenTask) {
    var isValid = true;
    var listTask = getLocalStorage()
    isValid &= validator.kiemTraRong(tenTask, 'notiInput', 'Tên Task không được để trống') && validator.kiemTraTrung(listTask, tenTask, 'notiInput', 'Task đã tồn tại');
    return isValid;
}


// Thêm task

getEle('addItem').addEventListener('click', function() {
    // isLoading = true;
    // checkLoading();
    var tenTask = getEle('newTask').value;
    var trangThai = 'todo';

    if (!validateInput(tenTask)) return;

    // Khởi tạo đối tượng todoTask từ lớp đối tượng task

    var todoTask = new task(tenTask, trangThai);
    // Thêm todoTask vào mảng
    ds.addTaskApi(todoTask)
        .then(function(res) {
            getTask();
        })
        .catch(function(err) {
            console.log(err);
        })

})

function getLocalStorage() {
    if (localStorage.getItem('DSTASK')) {
        return JSON.parse(localStorage.getItem('DSTASK'))
            // renderListTask(ds);
    }
}

function setLocalStorage(DSTASK) {
    localStorage.setItem('DSTASK', JSON.stringify(DSTASK))
}