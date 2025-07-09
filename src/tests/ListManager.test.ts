import { ListManager } from "../components/ListManager";

describe("ListManager", () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `<div id="test-container"></div>`;
    container = document.getElementById("test-container")!;
  });

  it("should render input, button, and list", () => {
    const manager = new ListManager("test-container");

    expect(container.querySelector('input[type="text"]')).not.toBeNull();
    expect(container.querySelector("button")).not.toBeNull();
    expect(container.querySelector("ul")).not.toBeNull();
  });

  it("should add an item when clicking the add button", () => {
    new ListManager("test-container");

    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    const button = container.querySelector("button") as HTMLButtonElement;

    input.value = "Test Item";
    button.click();

    const listItems = container.querySelectorAll("ul li");
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain("Test Item");
  });

  it("should add an item when pressing Enter key in the input", () => {
    new ListManager("test-container");

    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    input.value = "Test Item Enter";

    const event = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
    });

    input.dispatchEvent(event);

    const listItems = container.querySelectorAll("ul li");
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain("Test Item Enter");
  });

  it("should not add empty item", () => {
    new ListManager("test-container");

    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    const button = container.querySelector("button") as HTMLButtonElement;

    input.value = "   ";
    button.click();

    const listItems = container.querySelectorAll("ul li");
    expect(listItems.length).toBe(0);
  });

  it("should remove item when remove button is clicked", () => {
    new ListManager("test-container");

    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    const button = container.querySelector("button") as HTMLButtonElement;

    input.value = "To be removed";
    button.click();

    const removeButton = container.querySelector(
      ".remove-button"
    ) as HTMLButtonElement;
    removeButton.click();

    const listItems = container.querySelectorAll("ul li");
    expect(listItems.length).toBe(0);
  });

  it("should clear all items", () => {
    const manager = new ListManager("test-container");

    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    const button = container.querySelector("button") as HTMLButtonElement;

    input.value = "Item 1";
    button.click();

    input.value = "Item 2";
    button.click();

    expect(container.querySelectorAll("ul li").length).toBe(2);

    manager.clearList();

    expect(container.querySelectorAll("ul li").length).toBe(0);
  });

  it("should return correct item objects", () => {
    const manager = new ListManager("test-container");

    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    const button = container.querySelector("button") as HTMLButtonElement;

    input.value = "First";
    button.click();

    input.value = "Second";
    button.click();

    const items = manager.getItemObjects();

    expect(items.length).toBe(2);
    expect(items[0].text).toBe("First");
    expect(items[1].text).toBe("Second");

    expect(items[0].id).toMatch(/[a-f0-9\-]{36}/);
    expect(items[1].id).toMatch(/[a-f0-9\-]{36}/);
  });

  it("should throw error if container does not exist", () => {
    document.body.innerHTML = "";

    expect(() => {
      new ListManager("non-existent-container");
    }).toThrow(/Container with ID "non-existent-container" not found./);
  });

  it("should clear input and focus after adding item", () => {
    const manager = new ListManager("test-container");

    const input = container.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    const button = container.querySelector("button") as HTMLButtonElement;

    input.value = "Test Focus";
    button.click();

    expect(input.value).toBe("");
    expect(document.activeElement).toBe(input);
  });
});
