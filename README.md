<div align="center">
  <img
    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ29rZHJ6cGZ6bGQxMHk3c3ZpeXM5M3RjZm55MWV0aHFlY21neHY1OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SOPagmuxYZChi/giphy.gif"
    alt="4R memory gif"
    width="500"
  >
</div>

<div align="center">

# 4R | Vocabulary Flashcards

### Recall → Reveal → Rate → Repeat

**A simple and playful vocabulary flashcard app built around active recall.**

</div>

---

<p align="center">
  4R is a responsive vocabulary learning application built with HTML, CSS and Vanilla JavaScript.
  Users can create their own word collections, practice with two-sided flashcards,
  track what they know and focus on the words that need more repetition.
</p>

---

## 🧠 The 4R Method

The main idea behind the project is a simple four-step vocabulary learning flow:

**1. Recall**  
Look at the word and try to remember its meaning before revealing the answer.

**2. Reveal**  
Flip the flashcard to reveal the translation and check your answer.

**3. Rate**  
Mark the word as **Known** or **Unknown** depending on how well you remembered it.

**4. Repeat**  
Practice the words that need more attention until they become familiar.

---

## 🎬 Demo

The demo below shows the main workflow of 4R — creating collections, practicing words, flipping flashcards and tracking progress.

<div align="center">

![4R Demo](assets/4r-demo.gif)

</div>

<br>

<p align="center">
  <a href="https://iremnuromgen.github.io/4r-vocabulary-flashcards/" target="_blank">
    🔗 <b>Live Demo — Try 4R here!</b>
  </a>
</p>

---

## 💡 Features

- 📚 **Custom Collections** — create vocabulary collections for any topic or language
- ✏️ **Collection Editing** — rename collections and add, edit or remove words
- 🗑️ **Collection Removal** — delete collections together with their progress
- 🃏 **Two-sided Flashcards** — flip cards to reveal translations
- 🎨 **Random Pastel Flashcards** — flashcard fronts use randomized pastel themes
- 🔀 **Randomized Practice** — words are shuffled during practice
- ✅ **Known / Unknown Rating** — classify words while practicing
- 📊 **Progress Tracking** — keep track of Remaining, Known and Unknown words
- 🔁 **Focused Practice** — practice Known or Unknown groups separately
- ♻️ **Progress Reset** — reset a collection and start again
- 💾 **Persistent Data** — collections and progress are stored with Local Storage
- 📱 **Responsive Design** — separate desktop and mobile interaction patterns
- 🧭 **Mobile Navigation** — switch between Practice, Collections and New Collection
- 🌈 **Random Backgrounds** — a different playful background is selected on page load
- 🪟 **Glass-style UI** — translucent panels and soft visual effects

---

## 🛠️ Tech Stack

| Technology | Usage |
| --- | --- |
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Responsive layouts, animations and visual design |
| **Vanilla JavaScript** | Application logic and DOM interactions |
| **ES6 Modules** | Modular JavaScript architecture |
| **LocalStorage API** | Persistent collections and practice progress |
| **Google Fonts** | Fredoka and Comfortaa typography |

No frontend framework or backend is used.

---

## 🧩 Project Architecture

The project is organized into small modules instead of keeping all application logic in a single JavaScript file.

- **pages/** contains page-specific styles
- **components/** contains reusable UI styles and JavaScript components
- **storage.js** handles Local Storage operations
- **collections.js** handles collection rendering and selection
- **practice.js** manages flashcard sessions and progress
- **words.js** manages adding, editing and removing words
- **modal.js** controls the collection modal
- **mobileNavigation.js** handles the mobile tab navigation
- **randomBackground.js** selects a random application background
- **components/** contains reusable elements such as flashcards, collection controls and confirmation dialogs

---

## 💾 Data & Progress

4R does not require an account or backend.

Collections, vocabulary words and practice progress are stored directly in the browser using the **LocalStorage API**.

Each collection keeps track of:

```text
Words
Known
Unknown
```

When a word is rated, its progress is saved immediately. Refreshing the page does not reset the current learning progress.

Because the data is browser-based, clearing browser storage will also remove saved collections.

---

## 📱 Responsive Design

The interface changes depending on the screen size.

### Desktop

Collections and Practice are displayed side by side:

```text
┌──────────────────┐    ┌─────────────────────────────┐
│   Collections    │    │          Practice           │
│                  │    │                             │
│                  │    │         Flashcard           │
│                  │    │                             │
└──────────────────┘    └─────────────────────────────┘
```

### Mobile

Only one main view is displayed at a time.

A bottom navigation bar lets the user switch between:

```text
Practice  |  Collections  |  New
```

---

## 🔄 Practice Flow

```text
Select Collection
       │
       ▼
     Recall
Try to remember
       │
       ▼
     Reveal
 Flip the card
       │
       ▼
      Rate
 Known / Unknown
       │
       ▼
     Repeat
Practice what remains
```

---

## 💻 Installation & Usage

Clone the repository:

```bash
git clone https://github.com/iremnuromgen/4r-vocabulary-flashcards.git
```

Move into the project directory:

```bash
cd 4r-vocabulary-flashcards
```

The project uses ES6 modules, so it is recommended to run it through a local development server.

For example, with the **VS Code Live Server** extension:

```text
Open index.html → Open with Live Server
```

---

## 👩‍💻 Author

**İremnur Ömgen**
