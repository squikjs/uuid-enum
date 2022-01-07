# `uuid-enum`

Enums with uuid support which are more robust.

## ⚙️ Installation

---

```js
// using yarn
yarn add uuid-enum

// or using npm
npm install uuid-enum
```

## 📚 Usage

---

```js
// import
import { Enum } from "uuid-enum";

// creating a new enum with fields `red`,`blue` and `green`
let colors = new Enum(["red", "blue", "green"]);

// checking equality
colors.red === colors.red; // true
colors.green === colors.blue; // false!

// freezing enum
colors.freeze();
colors.red = "RED"; // ERROR! The enum is frozen!

// checking if field exists
colors.exists("red"); // true
colors.exists("purple"); // false!

// getting uuid of field
colors.get("red");
// or
colors.red;

// appending a field
colors.append("yellow"); // wont work with frozen enum

// deleting a field
colors.delete("yellow"); // wont work with frozen enum

// recreating the enum (refreshing all uuid's)
colors.recreate(); // wont work with frozen enum
```

## 🐦 Thanks for downloading the package!

---

Made with ❤️ by `squik`.
