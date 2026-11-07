// Copy buttons for install commands. The page works without JavaScript;
// the buttons stay hidden unless the Clipboard API is available. Labels come
// from the markup (aria-label, data-copied-label) so each language sets its own.
if (navigator.clipboard) {
  for (const button of document.querySelectorAll(".cmd .copy")) {
    const label = button.getAttribute("aria-label");
    const copiedLabel = button.dataset.copiedLabel || label;
    button.hidden = false;
    button.addEventListener("click", async () => {
      const text = button.parentElement.querySelector("code").textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        button.dataset.copied = "";
        button.setAttribute("aria-label", copiedLabel);
        setTimeout(() => {
          delete button.dataset.copied;
          button.setAttribute("aria-label", label);
        }, 1600);
      } catch {
        /* Clipboard permission denied: the command stays selectable. */
      }
    });
  }
}
