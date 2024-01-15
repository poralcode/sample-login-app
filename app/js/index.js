// Import required modules from Electron
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Create a variable to store the main application window
let mainWindow;

// Function to create the main application window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false, // Hide the default window frame
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Load preload script
    },
  });

  // Load the HTML file into the main window
  mainWindow.title = "A sample login form";
  mainWindow.loadFile(path.join(__dirname, "../html/index.html"));

  // Event handler for when the main window is closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Create the main window when the app is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Create a new window when the app is activated (on macOS)
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

// IPC (Inter-Process Communication) handlers for window control
ipcMain.on("minimize-window", () => {
  mainWindow.minimize(); // Minimize the main window
});

ipcMain.on("maximize-window", () => {
  if (mainWindow.isMaximized()) {
    // If the window is maximized, unmaximize it and send an event
    mainWindow.unmaximize();
    mainWindow.webContents.send("unmaximize-window");
  } else {
    // If the window is not maximized, maximize it and send an event
    mainWindow.maximize();
    mainWindow.webContents.send("maximized-window");
  }
});

ipcMain.on("close-window", () => {
  mainWindow.close(); // Close the main window
});

// Event listener for toggling DevTools using IPC
ipcMain.on("toggle-devtools", () => {
  mainWindow.webContents.toggleDevTools();
});
