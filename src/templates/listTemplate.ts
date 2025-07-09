export function getListTemplate(config: {
  inputClass?: string;
  buttonClass?: string;
  listClass?: string;
}): string {
  return `
    <div class="card shadow-sm rounded-4 p-4 border-0" style="max-width: 400px; margin: auto;">
      <h4 id="list-title" class="mb-3 fw-bold text-primary">To-Do List</h4>
      <div class="input-group mb-3">
        <input 
          type="text" 
          id="item-input" 
          class="form-control ${config.inputClass ?? ""}" 
          placeholder="Enter item"
          aria-labelledby="list-title item-input-label"
          aria-describedby="item-input-description"
        />
        <div id="item-input-label" class="sr-only">Add new to-do item</div>
        <div id="item-input-description" class="sr-only">Type your item and press the Add button or Enter key</div>
        <button 
          id="add-button" 
          class="btn btn-primary ml-3 ${config.buttonClass ?? ""}"
          aria-label="Add item to the list">
          Add Item
        </button>
      </div>
      <ul 
        id="item-list" 
        class="list-group gap-2 ${config.listClass ?? ""}"
        role="list"
        aria-label="List of items">
      </ul>
    </div>
  `;
}
