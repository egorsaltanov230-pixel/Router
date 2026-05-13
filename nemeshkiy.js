const btnDict = document.querySelector(".btn-german");
const dict = document.querySelector(".dict-german");
const btnClose = document.querySelector(".btn-close-german");
const form = document.querySelector(".dict-form");
const inputs = document.querySelectorAll(".dict-input");
const list = document.querySelector(".dict-list-german");

let words = JSON.parse(localStorage.getItem('germanWords')) || [];

btnDict.addEventListener("click", () => {
    dict.style.display = "block";
});

btnClose.addEventListener("click", () => {
    dict.style.display = "none";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addWord();
});

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function addWord() {
    let word = inputs[0].value.trim();
    let translate = inputs[1].value.trim();
    
    if (word === "" || translate === "") {
        alert("Geben Sie ein Wort und seine Übersetzung ein");
        return;
    }
    
    let newWord = {
        id: Date.now(),
        word: word,
        translate: translate
    };
    
    words.push(newWord);
    inputs[0].value = "";
    inputs[1].value = "";
    
    saveWords();
    renderWords();
}

function saveWords() {
    localStorage.setItem('germanWords', JSON.stringify(words));
}

function renderWords() {
    list.innerHTML = "";
    
    words.forEach((wordItem) => {
        let item = document.createElement("li");
        item.classList.add("dict-item");
        
        let textSpan = document.createElement("span");
        textSpan.textContent = escapeHtml(wordItem.word) + " - " + escapeHtml(wordItem.translate);
        
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("dict-item__delete");
        deleteBtn.innerHTML = `<svg
            class="dict-item__icon"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="#cb6e6e"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>`;
        
        // Используем id вместо index для удаления слова
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            // Фильтруем массив, оставляя только слова с id, не равным удаляемому
            words = words.filter(word => word.id !== wordItem.id);
            saveWords();
            renderWords();
        });
        
        item.append(textSpan, deleteBtn);
        list.appendChild(item);
    });
}

// Загружаем слова при загрузке страницы
renderWords();
