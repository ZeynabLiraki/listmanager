import $ from "jquery";

export function getElementById<T extends HTMLElement>(id: string): JQuery<T> {
  const $el = $(`#${id}`);
  if ($el.length === 0) {
    throw new Error(`Element with ID "${id}" not found.`);
  }
  return $el as JQuery<T>;
}

export function setInnerHTML($el: JQuery<HTMLElement>, html: string): void {
  $el.html(html);
}

export function focusElement($el: JQuery<HTMLElement>): void {
  $el[0]?.focus();
}

export function createElementFromHTML(html: string): JQuery<HTMLElement> {
  return $(html);
}
