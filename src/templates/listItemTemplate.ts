export function getListItemTemplate(
  id: string,
  text: string,
  removeButtonClass?: string,
  itemClass?: string
): string {
  return `
    <li 
      class="list-group-item d-flex justify-content-between align-items-center border rounded px-3 py-2 shadow-sm mb-2 ${
        itemClass ?? ""
      }" 
      data-id="${id}"
      role="listitem"
      aria-label="Item: ${text}"
    >
      <span>${text}</span>
      <button 
        class="btn btn-outline-danger btn-sm remove-button bg-danger-subtle ${
          removeButtonClass ?? ""
        }" 
        title="Remove"
        aria-label="Remove item: ${text}"
      >
        ✕
      </button>
    </li>
  `;
}
