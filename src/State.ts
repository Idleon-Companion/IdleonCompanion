export class StateManager {
  private version: string;

  constructor(version: string) {
    console.log(`Idleon Companion loaded - v${version}`);
    this.version = version;
    let savedVersion = localStorage.getItem("version") || this.version;
    // Perform version controlling here
    if (savedVersion < "0.1.0") {
      // Consider all previous stored data invalid
      localStorage.clear();
    }
    if (savedVersion < "0.1.1") {
      // Task reworked to allow custom tasks
      localStorage.removeItem("tasks");
    }
    localStorage.setItem("version", version);
  }

  // Load data from local storage
  load(key: string): any {
    return localStorage.getItem(key);
  }

  // Save a value in local storage
  save(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}
