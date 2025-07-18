export default function getModalTemlate(): string {
  return `
<div id="list-modal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">List Items</h5>
      </div>
      <div class="modal-body">
         <ul id="modal-list"></ul>
      </div>
      <div class="modal-footer">
        <button id="close-modal" aria-label="close modal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    `;
}