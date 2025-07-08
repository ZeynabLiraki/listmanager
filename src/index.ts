import { ListManager } from "./ListManager";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  new ListManager("list-container", {
    inputClass: "my-input",
    buttonClass: "my-button",
    listClass: "my-list",
    itemClass: "my-item",
    removeButtonClass: "my-remove-btn",
  });
});
