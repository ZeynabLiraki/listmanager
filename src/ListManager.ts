import $ from "jquery";

export class ListManager {
  private $container: JQuery<HTMLElement>;
  private $input!: JQuery<HTMLInputElement>;
  private $button!: JQuery<HTMLButtonElement>;
  private $list!: JQuery<HTMLUListElement>;

  constructor(containerId: string) {
    const $container = $(`#${containerId}`);
    if ($container.length === 0) {
      throw new Error(`Container with ID "${containerId}" not found.`);
    }
    this.$container = $container;
    this.renderUI();
    this.bindEvents();

    this.$input[0]?.focus();
  }

  private renderUI(): void {
    const html = `
     <div class="card shadow-sm rounded-4 p-4 border-0" style="max-width: 400px; margin: auto;">
      <h4 class="mb-3 fw-bold text-primary">To-Do List</h4>
      <div class="input-group mb-3">
        <input type="text" id="item-input" class="form-control" placeholder="Enter item" />
        <button id="add-button" class="btn btn-primary ml-3">Add Item</button>
      </div>
      <ul id="item-list" class="list-group gap-2"></ul>
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

    this.$input.on("keypress", (e: JQuery.KeyPressEvent) => {
      if (e.which === 13) this.addItemFromInput();
    });

    this.$list.on("click", ".remove-button", (e: JQuery.ClickEvent) => {
      $(e.currentTarget).closest("li").remove();
      this.$input[0]?.focus();
    });
  }

  private addItemFromInput(): void {
    const value = this.$input.val()?.toString().trim();
    if (!value) return;

    const $item = $(`
    <li class="list-group-item d-flex justify-content-between align-items-center border rounded px-3 py-2 shadow-sm">
      <span>${value}</span>
      <button class="btn btn-outline-danger btn-sm remove-button bg-danger-subtle" title="Remove">
        ✕
      </button>
    </li>
    `);
    this.$list.append($item);
    this.$input.val("");
    this.$input[0]?.focus();
  }

  public getItems(): string[] {
    const items: string[] = [];
    this.$list.find("li").each(function () {
      const text = $(this).clone().children().remove().end().text().trim();
      if (text) items.push(text);
    });
    return items;
  }

  public clearList(): void {
    this.$list.empty();
  }
}
