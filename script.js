// import {db} from './firebase'
function getItems() {
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        let option = document.getElementById("selectToDo");
        option.addEventListener("change", (e) => {
            filterItems(items, e.target.value);
        });
        generateItems(items);
        // console.log(items)
    });
}
document.getElementById("addItemButton").addEventListener("submit", myFunction);

function myFunction(event){
  addItem(event)
}
function generateItems(items) {
    let todoItems = [];
    items.forEach((item) => {
        // console.log(item);
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        // HERE
        todoItem.classList.add(item.id);
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="assets/icon-check.svg">';
        checkMark.addEventListener("click", function () {
            markCompleted(item.id);
        });
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;

        let trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        if (item.status == "completed") {
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
        }

        trashButton.onclick = function (event) {
            event.preventDefault();
            db.collection("todo-items").doc(item.id).delete();
        };

        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItem.appendChild(trashButton);
        todoItems.push(todoItem);
    });
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}

function filterItems(items, query) {
    // let res;
    // if (query == "all") {
    //   res = items;
    //   // generateItems(items);
    // } else {
    //   res = items.filter((item) => item.status == query);
    //   res.forEach((singleRes) => {
    //     // console.log("singleRes.id", singleRes.id);
    //     let todoItemsRes = document.querySelectorAll(".todo-item");
    //     todoItemsRes.forEach((todoItem) => {
    //       // console.log("todoItem.childNodes", todoItem.childNodes);
    //       todoItem.childNodes[0].addEventListener("click", (e) => {
    //         if (todoItem.classList.contains(singleRes.id))
    //           todoItem.style.display = "none";
    //       });
    //     });
    //   });
    // }
    // generateItems(res);
    let result = items;
    let resultNodes = document.querySelectorAll(".todo-item");
    resultNodes.forEach((resultNode, index) => {
        // resultNode.childNodes[0].addEventListener("click", () => {
        //   markCompleted(result[index].id);
        // });
        switch (query) {
            case "all":
                resultNode.style.display = "flex";
                break;
            case "completed":
                if (result[index].status === "completed") {
                    resultNode.style.display = "flex";
                    resultNode.childNodes[0].addEventListener("click", () => {
                        // result[index].status = "active";
                        resultNode.style.display = "none";
                    });
                } else {
                    resultNode.style.display = "none";
                }
                break;
            case "active":
                if (result[index].status === "active") {
                    resultNode.style.display = "flex";
                    resultNode.childNodes[0].addEventListener("click", () => {
                        // result[index].status = "completed";
                        resultNode.style.display = "none";
                    });
                } else {
                    resultNode.style.display = "none";
                }
                break;
        }
    });
}

function addItem(event) {
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active",
    });
    text.value = "";
}

function markCompleted(id) {
    let item = db.collection("todo-items").doc(id);
    item.get().then(function (doc) {
        if (doc.exists) {
            if (doc.data().status == "active") {
                item.update({
                    status: "completed",
                });
            }
            else if (doc.data().status == "completed") {
                item.update({
                    status: "active",
                });
            }
        }
    });
}

getItems();