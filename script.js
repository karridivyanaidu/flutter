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

  Swal.fire({
    title: 'Save this entry?',
    text: "Do you want to save your diary entry?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, save it',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#7D4AEA', // Purple
    cancelButtonColor: '#aaa',
    background: '#2E234A',
    color: '#F8F6FF'
  }).then((result) => {
    if (result.isConfirmed) {
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

      Swal.fire({
        title: 'Saved!',
        text: 'Your entry has been saved.',
        icon: 'success',
        confirmButtonColor: '#7D4AEA',
        background: '#2E234A',
        color: '#F8F6FF'
      });
    }
  });
});


function deleteEntry(index) {
  Swal.fire({
    title: 'Delete this entry?',
    text: "This action cannot be undone!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#7D4AEA',
    confirmButtonText: 'Yes, delete it!',
    background: '#2E234A',
    color: '#F8F6FF'
  }).then((result) => {
    if (result.isConfirmed) {
      entries.splice(index, 1);
      renderEntries();
      clearFields();

      Swal.fire({
        title: 'Deleted!',
        text: 'Your entry has been removed.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#2E234A',
        color: '#F8F6FF'
      });
    }
  });
}


function clearFields() {
  entryTitle.value = "";
  entryContent.value = "";
  currentMood = "📝";
  selectedMood.textContent = currentMood;
  selectedEntryIndex = null;
}

function redirectToHome() {
  Swal.fire({
    title: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, logout',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',       // Red
    cancelButtonColor: '#7D4AEA',     // Purple
    background: '#2E234A',
    color: '#F8F6FF'
  }).then((result) => {
    if (result.isConfirmed) {
      // Redirect if confirmed
      window.location.href = "fake.html";  // Replace with your actual login or landing page
    }
  });
}



renderEntries();
