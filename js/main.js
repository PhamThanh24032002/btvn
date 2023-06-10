const btnAdd = document.querySelector(".btnAdd");
const overlay = document.querySelector(".overlay");
const formAddEdit = document.querySelector(".form-add-edit");
const form = document.querySelector(".form");
const btnComplete = document.querySelector("#complete");
const btnCancel = document.querySelector("#cancel");
const mail = document.querySelector("#mail");
const des = document.querySelector("#des");
const author = document.querySelector("#author");
const tbody = document.querySelector("tbody");

let dataUser = [
  {
    id: "254ds",
    mail: "Ecommerce",
    des: "Front End",
    author: "Phạm Quốc Thành",
  },
];

btnComplete.classList.add("add");

const renderData = (user) => {
  const rowCells = [
    { className: "id", text: user.id },
    { className: "title", text: user.mail },
    { className: "des", text: user.des },
    { className: "author", text: user.author },
    { className: "edit", html: '<i class="fas fa-edit"></i>' },
    { className: "trash", html: '<i class="fas fa-trash-alt"></i>' }
  ];

  const newcreate = document.createElement("tr");
  rowCells.forEach(({ className, text, html }) => {
    const cell = document.createElement("td");
    cell.classList.add(className);
    if (text) {
      cell.textContent = text;
    } else if (html) {
      cell.innerHTML = html;
    }
    newcreate.appendChild(cell);
  });

  tbody.appendChild(newcreate);
};



const showPopup = () => {
  overlay.classList.add("active");
  formAddEdit.classList.add("active");
};

const hidePopup = () => {
  overlay.classList.remove("active");
  formAddEdit.classList.remove("active");
};

const deleteInputValue = () => {
  mail.value = "";
  des.value = "";
  author.value = "";
};

const handleEdit = (e) => {
  showPopup();
  btnComplete.className = "update";
  const clicked = e.target;
  const trClosest = clicked.closest("tr");
  const currentMail = trClosest.querySelector(".title").innerText;
  const currentDes = trClosest.querySelector(".des").innerText;
  const currentAuthor = trClosest.querySelector(".author").innerText;
  mail.value = currentMail;
  des.value = currentDes;
  author.value = currentAuthor;
  trClosest.classList.add("updateUser");
};

const handleDelete = (e) => {
  const clicked = e.target;
  const trClosest = clicked.closest("tr");
  const id = trClosest.querySelector(".id").innerText;
  dataUser = dataUser.filter((user) => user.id !== id);
  trClosest.remove();
};

const addNewUser = () => {
  const id = (Math.random() + 1).toString(36).substring(7);
  const newUser = {
    id: id,
    mail: mail.value,
    des: des.value,
    author: author.value,
  };
  dataUser.push(newUser);
  hidePopup();
  renderData(newUser);
  deleteInputValue();
};

const updateCurrentUser = () => {
  const trUpdate = tbody.querySelector(".updateUser");
  trUpdate.querySelector(".title").innerText = mail.value;
  trUpdate.querySelector(".des").innerText = des.value;
  trUpdate.querySelector(".author").innerText = author.value;
  const id = trUpdate.querySelector(".id").innerText;
  const user = dataUser.find((user) => user.id === id);
  if (user) {
    user.mail = mail.value;
    user.des = des.value;
    user.author = author.value;
  }
  trUpdate.classList.remove("updateUser");
  btnComplete.className = "add";
  deleteInputValue();
  hidePopup();
};

btnAdd.addEventListener("click", () => {
  showPopup();
});

btnCancel.addEventListener("click", () => {
  hidePopup();
});

btnComplete.addEventListener("click", () => {
  if (btnComplete.classList.contains("add")) {
    addNewUser();
  } else if (btnComplete.classList.contains("update")) {
    updateCurrentUser();
  }
});

tbody.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked.classList.contains("fa-edit")) {
    handleEdit(e);
  } else if (clicked.classList.contains("fa-trash-alt")) {
    handleDelete(e);
  }
});
