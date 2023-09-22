// Import required module for IPC communication
const { ipcRenderer } = require("electron");

// Event listener when the DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Get references to the control buttons, form, etc.
  const btnMinimize = document.getElementById("btn-titlebar-minimize");
  const btnMaximize = document.getElementById("btn-titlebar-maximize");
  const btnClose = document.getElementById("btn-titlebar-close");

  // Event listeners for control button clicks
  btnMinimize.addEventListener("click", () => {
    ipcRenderer.send("minimize-window"); // Send IPC message to minimize the window
  });

  btnMaximize.addEventListener("click", () => {
    ipcRenderer.send("maximize-window"); // Send IPC message to maximize/unmaximize the window
  });

  btnClose.addEventListener("click", () => {
    ipcRenderer.send("close-window"); // Send IPC message to close the window
  });

  // IPC event listeners to handle window maximize/unmaximize events
  ipcRenderer.on("unmaximize-window", () => {
    btnMaximize.innerHTML = `<i class="fa-regular fa-window-maximize"></i>`; // Update the icon of the button maximized.
  });

  ipcRenderer.on("maximized-window", () => {
    btnMaximize.innerHTML = `<i class="fa-regular fa-window-restore"></i>`; // Update the icon of the button maximized.
  });
});
