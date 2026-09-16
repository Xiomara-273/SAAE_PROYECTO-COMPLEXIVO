import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = signal<boolean>(this.getInitialTheme());

  public readonly modoOscuro = this.isDarkMode.asReadonly();

  constructor() {
    this.applyTheme(this.isDarkMode());
  }

  private getInitialTheme(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('saae_modo_oscuro');
      return saved === 'true';
    }
    return false;
  }

  setModoOscuro(enabled: boolean): void {
    this.isDarkMode.set(enabled);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('saae_modo_oscuro', String(enabled));
    }
    this.applyTheme(enabled);
  }

  private applyTheme(enabled: boolean): void {
    if (typeof document !== 'undefined') {
      const body = document.body;
      const html = document.documentElement;
      if (enabled) {
        body.classList.add('dark-mode');
        html.classList.add('dark-mode');
        body.setAttribute('data-theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        html.classList.remove('dark-mode');
        body.setAttribute('data-theme', 'light');
      }
    }
  }
}
