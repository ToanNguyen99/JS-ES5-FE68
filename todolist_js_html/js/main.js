var ds = new DanhSachTasks();
var validator = new Validator();

var getEle = function(id) {
        return document.getElementById(id)
    }
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
                        <button class="remove" onclick="xoaTask('${dstask.tenTask}')">
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
                    <button class="remove" onclick="xoaTask('${dstask.tenTask}')">
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
function xoaTask(name) {
    ds.xoaTask(name);
    renderListTask(ds.arr);
    setLocalStorage();
}
// Update task
function capNhatTask(name) {
    ds.capNhatTask(name);
    renderListTask(ds.arr);
    setLocalStorage();

}
// Check validator
var validateInput = function(tenTask) {
        var isValid = true;

        isValid &= validator.kiemTraRong(tenTask, 'notiInput', 'Tên Task không được để trống') && validator.kiemTraTrung(tenTask, 'notiInput', 'Tên Task đã tồn tại');
        return isValid;
    }
    // Lấy data từ localstorage
getLocalStorage();

// Thêm task

getEle('addItem').addEventListener('click', function() {
    var tenTask = getEle('newTask').value;
    var trangThai = 'todo';

    if (!validateInput(tenTask)) return;

    // Khởi tạo đối tượng todoTask từ lớp đối tượng task

    var todoTask = new task(tenTask, trangThai);
    // Thêm todoTask vào mảng
    ds.themTask(todoTask);
    // console.log(ds.arr);

    renderListTask(ds.arr);
    // Thêm dữ liệu vào local storage
    setLocalStorage();

})

function getLocalStorage() {
    if (localStorage.getItem('DSTASK')) {
        ds.arr = JSON.parse(localStorage.getItem('DSTASK'))
        renderListTask(ds.arr);
    }
}

function setLocalStorage() {
    localStorage.setItem('DSTASK', JSON.stringify(ds.arr))
}