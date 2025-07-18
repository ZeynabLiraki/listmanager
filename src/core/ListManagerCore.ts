import { v4 as uuidv4 } from "uuid";

export class ListManagerCore {
  private static instance: ListManagerCore;
  private items: { id: string; text: string }[] = [];
  private storageKey: string = "list-storage";
  private constructor() {
    this.loadStorage()
  }
  public static getInstance(): ListManagerCore {
    if (!ListManagerCore.instance) {
      ListManagerCore.instance = new ListManagerCore();
    }
    return ListManagerCore.instance;
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        this.items = JSON.parse(data);
      } catch (error) {
        console.log("localstorage is empty");
        this.items = [];
      }
    }
  }

  addItem(text: string): string {
    const id = uuidv4();
    this.items.push({ id, text });
    this.saveToStorage()
    return id;
  }

  removeItem(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToStorage()
  }

  getItems() {
    return [...this.items];
  }

  clear() {
    this.items = [];
    this.saveToStorage()
  }
}
