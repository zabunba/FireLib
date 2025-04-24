# KraftUI

**KraftUI** is a lightweight UI library for generating HTML with JavaScript functions. It allows developers to build simple web interfaces using a component-like structure `KraftJS` required.

---

## Features

- Build HTML using JavaScript
- Inline CSS styling with a JS object
- Custom components (Title, Block, Button, etc.)
- Clean and minimal

---

## Installation

You can include KraftUI in your project by copying the functions into your file or importing them as a module if using bundlers.

---

## Components Build Example

```.js
//Line 41-49 KraftUI.js
export function Title({ children, type, style }) {
  let Titletype;
  if(type == "Title1") Titletype = "h1";
  if(type == "Title2") Titletype = "h2";
  if(type == "Title3") Titletype = "h3";
  if(type == "Title4") Titletype = "h4";
  if(type == "SubTitle") Titletype = "h5";
  return `<${Titletype} style="${toInlineStyle(style)}">${children.join('')}</${Titletype}>`;
}
```

---

## Usage Example w/KraftJS  

```.js
//Minimal Preview from App.js (KraftJS)
import { StyleSheet, Title, Webpage } from "../lib/FireLib.js";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'blue',
  }
});

export default function App() {
  return (
    <Webpage pageTitle="I am something">
      <Title type="SubTitle" style={styles.title}>This is a h1</Title>
    </Webpage>
  );
}



