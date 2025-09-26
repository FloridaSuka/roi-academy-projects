function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();
  if (taskText !== "") {
    let list = document.getElementById("list");
    let listItem = document.createElement("li");
    listItem.textContent = taskText;
    input.value = "";
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteBtn.style.backgroundColor = "#1D1BA3";
    deleteBtn.onclick = function () {
      list.removeChild(listItem);
    };
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
  }
}
