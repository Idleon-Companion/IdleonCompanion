export class StateManager {
  private version: string;

  constructor(version: string) {
    console.log(`Idleon Companion loaded - v${version}`);
    this.version = version;
    // Perform version controlling here
    if (version < "0.1.0") {
      // Consider all previous stored data invalid
      localStorage.clear();
    }
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
