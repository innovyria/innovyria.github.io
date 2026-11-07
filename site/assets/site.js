// Copy buttons for install commands. The page works without JavaScript;
// the buttons stay hidden unless the Clipboard API is available.
if (navigator.clipboard) {
  for (const button of document.querySelectorAll(".cmd .copy")) {
    button.hidden = false;
    button.addEventListener("click", async () => {
      const text = button.parentElement.querySelector("code").textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        button.dataset.copied = "";
        button.setAttribute("aria-label", "Copied");
        setTimeout(() => {
          delete button.dataset.copied;
          button.setAttribute("aria-label", "Copy command");
        }, 1600);
      } catch {
        /* Clipboard permission denied: the command stays selectable. */
      }
    });
  }
}
