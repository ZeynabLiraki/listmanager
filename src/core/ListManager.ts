import { getListTemplate } from "../templates/listTemplate";
import { getListItemTemplate } from "../templates/listItemTemplate";
import {
  getElementById,
  setInnerHTML,
  focusElement,
  createElementFromHTML,
} from "./domHelpers";
import { ListManagerCore } from "./ListManagerCore";

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
  private core: ListManagerCore;

  constructor(containerId: string, config: ListManagerConfig = {}) {
    this.$container = getElementById<HTMLElement>(containerId);
    this.config = config;
    this.core = new ListManagerCore();

    this.renderUI();
    this.bindEvents();
    this.$input[0]?.focus();
  }

  private renderUI(): void {
    const html = getListTemplate(this.config);
    setInnerHTML(this.$container, html);

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
      if (e.which === 13) {
        this.addItemFromInput();
      }
    });
  }

  private addItemFromInput(): void {
    const value = this.$input.val()?.toString().trim();
    if (!value) return;

    const itemId = this.core.addItem(value);

    const itemHtml = getListItemTemplate(
      itemId,
      value,
      this.config.removeButtonClass,
      this.config.itemClass
    );
    const $item = createElementFromHTML(itemHtml);

    $item.find(".remove-button").on("click", () => {
      this.core.removeItem(itemId);
      $item.remove();
      focusElement(this.$input);
    });

    this.$list.append($item);
    this.$input.val("");
    this.$input[0]?.focus();
  }

  public getItemObjects(): { id: string; text: string }[] {
    return this.core.getItems();
  }

  public clearList(): void {
    this.core.clear();
    this.$list.empty();
  }
}

