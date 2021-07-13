var ds = new DanhSachTasks();
var validator = new Validator();

var getEle = function(id) {
        return document.getElementById(id)
    }
    // Lấy dữ liệu

var getTask = function() {
    ds.getTaskApi().then(function(res) {
        console.log(res.data);
        renderListTask(res.data)
    }).catch(function(err) {
        console.log(err);
    })
}
getTask()
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
                                <button class="complete" onclick="capNhatTask('${dstask.tenTask}')">
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
                                <button class="complete" onclick="capNhatTask('${dstask.tenTask}')">
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
        ds.deleteTaskApi(id)
            .then(function(res) {
                getTask();
            })
            .catch(function(err) {
                console.log(err);
            })
    }
    // // Update task
    // function capNhatTask(name) {
    //     ds.capNhatTask(name);
    //     renderListTask(ds.arr);
    //     setLocalStorage();

// }
// Check validator
var validateInput = function(tenTask) {
    var isValid = true;

    isValid &= validator.kiemTraRong(tenTask, 'notiInput', 'Tên Task không được để trống');
    return isValid;
}


// Thêm task

getEle('addItem').addEventListener('click', function() {
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

// function getLocalStorage() {
//     if (localStorage.getItem('DSTASK')) {
//         ds.arr = JSON.parse(localStorage.getItem('DSTASK'))
//         renderListTask(ds.arr);
//     }
// }

// function setLocalStorage() {
//     localStorage.setItem('DSTASK', JSON.stringify(ds.arr))
// }