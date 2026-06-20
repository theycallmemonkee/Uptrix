export interface TurnstileObject {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      size: "invisible" | "normal" | "compact";
      callback: (token: string) => void;
      "error-callback"?: (err: unknown) => void;
    }
  ) => string;
  reset: (id: string) => void;
  execute: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileObject;
  }
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface NavItem {
  label: string;
  href: string;
}
