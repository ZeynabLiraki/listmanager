import $ from "jquery";
import { v4 as uuidv4 } from "uuid";

interface ListManagerConfig {
  inputClass?: string;
  buttonClass?: string;
  listClass?: string;
  itemClass?: string;
  removeButtonClass?: string;
}

export class ListManager {
  private $container: JQuery<HTMLElement>;
  private $input!: JQuery<HTMLInputElement>;
  private $button!: JQuery<HTMLButtonElement>;
  private $list!: JQuery<HTMLUListElement>;
  private config: ListManagerConfig;

  private items: { id: string; text: string }[] = [];

  constructor(containerId: string, config: ListManagerConfig = {}) {
    const $container = $(`#${containerId}`);
    if ($container.length === 0) {
      throw new Error(`Container with ID "${containerId}" not found.`);
    }

    this.$container = $container;
    this.config = config;

    this.renderUI();
    this.bindEvents();
    this.$input[0]?.focus();
  }

  private renderUI(): void {
    const html = `
    <div class="card shadow-sm rounded-4 p-4 border-0" style="max-width: 400px; margin: auto;">
      <h4 id="list-title" class="mb-3 fw-bold text-primary">To-Do List</h4>
      
      <div class="input-group mb-3">
        <input 
          type="text" 
          id="item-input" 
          class="form-control ${this.config.inputClass ?? ""}" 
          placeholder="Enter item"
          aria-labelledby="list-title item-input-label"
          aria-describedby="item-input-description"
        />
        <div id="item-input-label" class="sr-only">Add new to-do item</div>
        <div id="item-input-description" class="sr-only">Type your item and press the Add button or Enter key</div>

        <button 
          id="add-button" 
          class="btn btn-primary ml-3 ${this.config.buttonClass ?? ""}"
          aria-label="Add item to the list">
          Add Item
        </button>
      </div>
      
      <ul 
        id="item-list" 
        class="list-group gap-2 ${this.config.listClass ?? ""}"
        role="list"
        aria-label="List of items">
      </ul>
    </div>
  `;

    this.$container.html(html);
    this.$input = this.$container.find(
      "#item-input"
    ) as JQuery<HTMLInputElement>;
    this.$button = this.$container.find(
      "#add-button"
    ) as JQuery<HTMLButtonElement>;
    this.$list = this.$container.find("#item-list") as JQuery<HTMLUListElement>;
  }

  private bindEvents(): void {
    this.$button.on("click", () => this.addItemFromInput());

    this.$input.on("keydown", (e: JQuery.KeyDownEvent) => {
      if (e.which === 13) this.addItemFromInput();
    });

    this.$list.on("click", ".remove-button", (e: JQuery.ClickEvent) => {
      const $li = $(e.currentTarget).closest("li");
      const id = $li.attr("data-id");

      if (id) {
        this.items = this.items.filter((item) => item.id !== id);
      }

      $li.remove();

      this.$input[0]?.focus();
    });
  }

  private addItemFromInput(): void {
    const value = this.$input.val()?.toString().trim();
    if (!value) return;

    const itemId = uuidv4();

    this.items.push({ id: itemId, text: value });

    const $item = $(`
      <li 
        class="list-group-item d-flex justify-content-between align-items-center border rounded px-3 py-2
        shadow-sm ${this.config.itemClass ?? ""}" 
        data-id="${itemId}"
        role="listitem"
        aria-label="Item: ${value}"
        >
        <span>${value}</span>
        <button 
          class="btn btn-outline-danger btn-sm remove-button bg-danger-subtle ${
            this.config.removeButtonClass ?? ""
          }" 
          title="Remove"
          aria-label="Remove item: ${value}"
          >
          ✕
        </button>
      </li>
    `);
    this.$list.append($item);
    this.$input.val("");
    this.$input[0]?.focus();
  }

  public getItemObjects(): { id: string; text: string }[] {
    const items: { id: string; text: string }[] = [];
    this.$list.find("li").each(function () {
      const id = $(this).attr("data-id") || "";
      const text = $(this).clone().children().remove().end().text().trim();
      if (id && text) items.push({ id, text });
    });
    return items;
  }

  public clearList(): void {
    this.items = [];
    this.$list.empty();
  }
}
