let entries = [];
let selectedEntryIndex = null;

const entryList = document.getElementById("entryList");
const entryTitle = document.getElementById("entryTitle");
const entryContent = document.getElementById("entryContent");
const emojiOptions = document.getElementById("emojiOptions");
const selectedMood = document.getElementById("selectedMood");

let currentMood = "📝"; // default

function renderEntries() {
  entryList.innerHTML = "";
  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${entry.title}</span>
      <button onclick="deleteEntry(${index})">🗑</button>
    `;
    li.addEventListener("click", () => loadEntry(index));
    entryList.appendChild(li);
  });
}

function loadEntry(index) {
  selectedEntryIndex = index;
  const entry = entries[index];
  entryTitle.value = entry.title;
  entryContent.value = entry.content;
  currentMood = entry.mood || "📝";
  selectedMood.textContent = currentMood;
}

emojiOptions.addEventListener("click", (e) => {
  if (e.target.dataset.emoji) {
    currentMood = e.target.dataset.emoji;
    selectedMood.textContent = currentMood;
  }
});

document.getElementById("saveEntry").addEventListener("click", () => {
  const title = entryTitle.value.trim();
  const content = entryContent.value.trim();

  if (!title) return;

  const entry = {
    title,
    content,
    mood: currentMood
  };

  if (selectedEntryIndex !== null) {
    entries[selectedEntryIndex] = entry;
  } else {
    entries.push(entry);
  }

  renderEntries();
  clearFields();
});

document.getElementById("deleteEntry").addEventListener("click", () => {
  if (selectedEntryIndex !== null) {
    entries.splice(selectedEntryIndex, 1);
    renderEntries();
    clearFields();
  }
});

function deleteEntry(index) {
  entries.splice(index, 1);
  renderEntries();
  clearFields();
}

function clearFields() {
  entryTitle.value = "";
  entryContent.value = "";
  currentMood = "📝";
  selectedMood.textContent = currentMood;
  selectedEntryIndex = null;
}

renderEntries();