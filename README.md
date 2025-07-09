# List Management

📝 ListManager

ListManager is a lightweight, modular TypeScript class built with jQuery and styled using Bootstrap, designed to dynamically manage a to-do list. Users can easily add, remove, retrieve, and clear items via keyboard or mouse interactions. The project is bundled using Webpack for efficient development and deployment.

This project demonstrates clean UI integration, accessibility features, best practices, and simple state management for list items.


## 📚 Table of Contents

- [List Management]()
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Technologies Used](#technologies-used)
  - [Setup and Installation](#setup-and-installation)
  - [Development](#Development)
  - [Testing](#testing)
  - [Live Demo](#live-demo)
  - [Further Improvements](#further-improvements)

## 🚀Introduction

This project implements a modular List Manager UI component using:

- TypeScript for static typing and OOP-based design
- jQuery for intuitive DOM manipulation and event handling
- Bootstrap 4 for responsive styling and layout
- Webpack for module bundling and asset management

The ListManager class encapsulates all logic and UI behavior, supporting:

- Adding items via input + button or by pressing the Enter key
- Removing individual items
- Retrieving all list items
- Clearing the entire list
- Focus handling and input reset
- Basic accessibility for screen readers and keyboard users


## 🛠Technologies Used

Mention the technologies and frameworks used in the project:
- TypeScript: Type-safe, object-oriented JavaScript
- jQuery: Simplified DOM interaction
- Bootstrap 4: Responsive and modern UI styling
- Webpack: Development and production bundling
- uuid: For generating unique identifiers for list items
- Jest: Unit testing framework

## ⚙️Setup and Installation

Step-by-step instructions to set up the project locally:

   
1. Clone the repository:

    git clone https://github.com/ZeynabLiraki/listmanager

    cd listmanager


2. Install dependencies:
    
    npm install
    

2. Start the development server:
    
    npm start
    

3. Open your browser at:

    http://localhost:9000/



## 🧑‍💻Development

- Source TypeScript files are in:          /src/core  and src/templates
- Stylesheets in:                         /src/assets
- Webpack handles bundling to:           /dist
- Tests are in:                         /src/test
- Build for production with:
       npm run build       

    
## ✅Testing

1. Run the tests:
    
    npm test
    

## 🚀Live Demo

You can access the live version of the application here:
[Live Demo](https://listmanager-os8wg3is7-zeynab-lirakis-projects.vercel.app/)
          

## 🔮Further Improvements

✨ Add drag-and-drop support for item reordering

📝 Implement edit functionality for existing list items

🧪 Increase test coverage and add integration tests

🌙 Add dark mode toggle

💾 Persist list data using localStorage or a backend API


