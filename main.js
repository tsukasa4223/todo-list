'use strict';

{
  // 定数の宣言
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const ul = document.getElementById("ul");
  
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todo) => {
      add(todo);
    });
  }
  
  // formがsubmitされた時の処理
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    add();
  });
  
  function add(todo) {
    let todoText = input.value;
    
    if (todo) {
      todoText = todo.text;
    }
    
    // inputにテキスト入力をしたらulにliを追加する処理
    if (todoText.length > 0) {
      const li = document.createElement("li");
      
      li.innerText = todoText;
      li.classList.add('list-group-item')
      
      // 両方がtrueだった時にクラスを追加する処理（リロード）
      if (todo && todo.completed) {
        li.classList.add("text-decoration-line-through");
      }
      
      li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        li.remove();
        saveData();
      });
      
      // liをクリックしたら打ち消し線をつけ消しする処理
      li.addEventListener("click", () => {
        li.classList.toggle("text-decoration-line-through");
        saveData();
      });
      
      ul.appendChild(li);
      input.value = "";
      saveData();
    }
  }
  // ローカルストレージに保存する処理
  function saveData() {
    const lists = document.querySelectorAll("li");
    const todos = [];
    

    lists.forEach((li) => {
      todos.push({
        text: li.innerText,
        completed: li.classList.contains("text-decoration-line-through"),
      });
    });
    
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}