<div align="center">
  <img
    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ29rZHJ6cGZ6bGQxMHk3c3ZpeXM5M3RjZm55MWV0aHFlY21neHY1OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SOPagmuxYZChi/giphy.gif"
    alt="4R memory gif"
    width="500"
  >
</div>

<div align="center">

# 4R

### Recall → Reveal → Rate → Repeat

**A simple vocabulary flashcard app built around active recall.**

</div>

<hr>

<p align="center">
  4R is a responsive vocabulary learning application built with HTML, CSS and Vanilla JavaScript.
  Users can create their own word collections, practice them with two-sided flashcards,
  rate each word as known or unknown, and focus on the words that need more repetition.
</p>

<hr>

<h3>
🧠 The 4R Method
</h3>

<p>
The core idea behind the project is based on a simple four-step learning flow:
</p>

<ul>
  <li>
    <b>Recall</b><br>
    Look at the word and try to remember its meaning before revealing the answer.
  </li>

  <li>
    <b>Reveal</b><br>
    Flip the flashcard to reveal the translation and check your answer.
  </li>

  <li>
    <b>Rate</b><br>
    Mark the word as <b>Known</b> or <b>Unknown</b> based on how well you remembered it.
  </li>

  <li>
    <b>Repeat</b><br>
    Review the words that need more practice until they become familiar.
  </li>
</ul>

<br>

<h3>
🧩 Thought Process & Design Decisions
</h3>

<p>
The main goal of 4R was to create a vocabulary practice experience that feels simple,
focused and easy to use without requiring an account or backend.
</p>

<p>
Instead of adding many complex learning features, I focused on a clear interaction loop:
see a word, recall the answer, reveal it, rate yourself, and continue practicing.
</p>

<ul>
  <li>
    <b>Designed around one clear learning loop:</b><br>
    The entire practice flow follows the Recall → Reveal → Rate → Repeat method,
    which also became the identity of the project.
  </li>

  <li>
    <b>Used Local Storage instead of a backend:</b><br>
    Collections, words and practice progress are stored directly in the browser,
    keeping the application lightweight and easy to run.
  </li>

  <li>
    <b>Separated the application into small JavaScript modules:</b><br>
    Storage, collections, practice logic, modal behavior and reusable UI components
    are kept in separate files for better readability and maintainability.
  </li>

  <li>
    <b>Created separate desktop and mobile experiences:</b><br>
    Desktop uses a two-panel Collections / Practice layout,
    while mobile uses bottom navigation to switch between the two views.
  </li>

  <li>
    <b>Used a playful visual language:</b><br>
    Pastel flashcards, randomized backgrounds and glass-style panels were used
    to make the practice experience feel less clinical and more approachable.
  </li>
</ul>

<br>

<h3>
🔍 Trade-offs & Limitations
</h3>

<ul>
  <li>
    <b>Browser-only persistence:</b><br>
    Data is stored using Local Storage, so collections do not automatically sync
    between different devices or browsers.
  </li>

  <li>
    <b>No authentication:</b><br>
    The project intentionally does not include user accounts or cloud storage.
  </li>

  <li>
    <b>Simple progress model:</b><br>
    Words are currently categorized as remaining, known or unknown.
    The project does not implement a full spaced-repetition scheduling algorithm.
  </li>

  <li>
    <b>Data is local to the current browser:</b><br>
    Clearing browser storage will also remove saved collections and progress.
  </li>
</ul>

<br>

<h3>
🎬 Demo
</h3>

<p>
The demo below shows the main 4R workflow:
creating a collection, practicing vocabulary with flashcards,
revealing answers and rating words as known or unknown.
</p>

<div align="center">

![4R Demo](assets/4r-demo.gif)

</div>

<br>

<p align="center">
  <a href="YOUR_LIVE_DEMO_URL" target="_blank">
    🔗 <b>Live Demo</b> — Try 4R here!
  </a>
</p>

<br>

<h3>
💡 Features
</h3>

<ul>
  <li>📚 <b>Custom collections</b> — create vocabulary collections for any topic or language</li>
  <li>✏️ <b>Collection editing</b> — rename collections and add, edit or remove words</li>
  <li>🗑️ <b>Collection removal</b> — delete collections together with their saved progress</li>
  <li>🃏 <b>Two-sided flashcards</b> — click a card to reveal its translation</li>
  <li>🔀 <b>Randomized practice</b> — words are shuffled during practice sessions</li>
  <li>✅ <b>Known / Unknown rating</b> — classify every practiced word</li>
  <li>📊 <b>Progress tracking</b> — view Remaining, Known and Unknown word counts</li>
  <li>🔁 <b>Focused repetition</b> — practice known or unknown word groups separately</li>
  <li>♻️ <b>Progress reset</b> — reset a collection and start practicing again</li>
  <li>💾 <b>Persistent state</b> — collections and progress survive page refreshes using Local Storage</li>
  <li>📱 <b>Responsive interface</b> — desktop and mobile layouts use different navigation patterns</li>
  <li>🎨 <b>Playful UI</b> — pastel flashcards, glass panels and randomized backgrounds</li>
</ul>

<br>

<h3>
🧠 Practice Flow
</h3>

```text
Collection
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
