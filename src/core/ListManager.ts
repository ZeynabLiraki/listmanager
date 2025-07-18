import { getListTemplate } from "../templates/listTemplate";
import { getListItemTemplate } from "../templates/listItemTemplate";
import {
  getElementById,
  setInnerHTML,
  focusElement,
  createElementFromHTML,
} from "./domHelpers";
import { ListManagerCore } from "./ListManagerCore";
import getModalTemlate from "../templates/modalListTemplate";

interface ListManagerConfig {
  inputClass?: string;
  buttonClass?: string;
  listClass?: string;
  itemClass?: string;
  removeButtonClass?: string;
  showButtonClass?: string;
  clearButtonClass?: string;
}

export class ListManager {
  private $container: JQuery<HTMLElement>;
  private $input!: JQuery<HTMLInputElement>;
  private $button!: JQuery<HTMLButtonElement>;
  private $list!: JQuery<HTMLUListElement>;
  private config: ListManagerConfig;
  private core: ListManagerCore;
  private $showModalButton!: JQuery<HTMLButtonElement>;
  private $clearButton!: JQuery<HTMLButtonElement>;

  constructor(containerId: string, config: ListManagerConfig = {}) {
    this.$container = getElementById<HTMLElement>(containerId);
    this.config = config;
    this.core = ListManagerCore.getInstance();

    this.renderUI();
    this.renderInitialItems();
    this.bindEvents();
    this.$input[0]?.focus();
  }

  private renderUI(): void {
    const html = getListTemplate(this.config);
    setInnerHTML(this.$container, html);

    const modalHtml = createElementFromHTML(getModalTemlate());
    this.$container.append(modalHtml);

    this.$input = this.$container.find(
      "#item-input"
    ) as JQuery<HTMLInputElement>;
    this.$button = this.$container.find(
      "#add-button"
    ) as JQuery<HTMLButtonElement>;
    this.$list = this.$container.find("#item-list") as JQuery<HTMLUListElement>;

    this.$clearButton = this.$container.find(
      "#clear-list"
    ) as JQuery<HTMLButtonElement>;
    this.$showModalButton = this.$container.find(
      "#show-modal-items"
    ) as JQuery<HTMLButtonElement>;
  }

  private renderInitialItems(): void {
    const items = this.core.getItems();

    for (const item of items) {
      const itemHtml = getListItemTemplate(
        item.id,
        item.text,
        this.config.removeButtonClass,
        this.config.itemClass
      );
      const $item = createElementFromHTML(itemHtml);

      $item.find(".remove-button").on("click", () => {
        this.core.removeItem(item.id);
        $item.remove();
        focusElement(this.$input);
      });

      this.$list.append($item);
    }
  }


    private showAllItemList(): void {
    const items = this.getItemObjects();

    const $modal = this.$container.find("#list-modal");
    const $modalList = $modal.find("#modal-list");
    $modalList.empty();

    if (items.length === 0) {
      $modalList.append(`<p>List is eampty!</p>`);
    } else {
      items.forEach((item) => {
        const $li = $("<li>").text(item.text).attr("aria-label", item.text);
        $modalList.append($li);
      });
    }

    $modal.show();

    this.$container
      .find("#close-modal")
      .off("click")
      .on("click", () => {
        $modal.hide();
      });
  }

  private bindEvents(): void {
    this.$button.on("click", () => this.addItemFromInput());

    this.$input.on("keydown", (e: JQuery.KeyDownEvent) => {
      if (e.which === 13) {
        this.addItemFromInput();
      }
    });

    this.$clearButton.on("click", () => this.clearList());

    this.$showModalButton.on("click", () => this.showAllItemList());
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
