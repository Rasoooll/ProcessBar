# Console Process Bar

A lightweight and easy-to-use console progress bar for Node.js.  
Perfect for loops, CLI tools, and any task where you want quick visual feedback.

---

## 📦 Installation

```bash
npm install console_processbar
```

## 🚀 Import as Needed

```ts
const ProcessBar = require("console_processbar");
// Or
import ProcessBar from "console_processbar";
```

## 🚀 Usage

```ts
// Initialize the bar
// total  → total number of iterations
// title  → title shown before the progress bar
const total = 100
const bar = new ProcessBar(total, "Processing Items");

// Run through your steps
for (let i = 0; i < total; i++) {
    // ... your logic here ...
    bar.next(); // Update progress
}

// Finish the bar
bar.finish();
```
