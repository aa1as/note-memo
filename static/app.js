async function editMemo(event) {
  const id = event.target.date.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.date.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.querySelector("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editbtn = document.createElement("button");
  editbtn.innerText = "수정하기";
  editbtn.addEventListener("click", editMemo);
  editbtn.dataset.id = memo.id;

  const delbut = document.createElement("button");
  delbut.innerText = "삭제";
  delbut.addEventListener("click", deleteMemo);
  delbut.dataset.id = memo.id;

  li.appendChild(editbtn);
  il.appendChild(delbtu);
  ul.appendChild(li);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("#submit", handleSubmit);

readMemo();
