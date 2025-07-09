import { v4 as uuidv4 } from "uuid";

export class ListManagerCore {
  private items: { id: string; text: string }[] = [];

  addItem(text: string): string {
    const id = uuidv4();
    this.items.push({ id, text });
    return id;
  }

  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getItems() {
    return [...this.items];
  }

  clear() {
    this.items = [];
  }
}
