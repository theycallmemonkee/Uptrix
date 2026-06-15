"use client";

import { useEffect, useRef } from "react";

interface TurnstileProps {
  onVerify: (token: string) => void;
  widgetRef?: React.MutableRefObject<{ reset: () => void; execute: () => void } | null>;
}

/**
 * InvisibleTurnstile component.
 * Renders a hidden div and initializes Cloudflare Turnstile in "invisible" mode.
 * Defaults to the public Cloudflare test site key so that it runs in local development without setup.
 */
export function InvisibleTurnstile({ onVerify, widgetRef }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
    let widgetId: string | null = null;

    const renderWidget = () => {
      if (typeof window !== "undefined" && (window as any).turnstile && containerRef.current) {
        try {
          widgetId = (window as any).turnstile.render(containerRef.current, {
            sitekey: siteKey,
            size: "invisible",
            callback: (token: string) => {
              onVerify(token);
            },
            "error-callback": (err: any) => {
              console.error("[turnstile] client-side verification error", err);
            }
          });

          if (widgetRef) {
            widgetRef.current = {
              reset: () => {
                if (widgetId && (window as any).turnstile?.reset) {
                  (window as any).turnstile.reset(widgetId);
                }
              },
              execute: () => {
                if (widgetId && (window as any).turnstile?.execute) {
                  (window as any).turnstile.execute(widgetId);
                }
              }
            };
          }

          // Trigger execution automatically
          if (widgetId && (window as any).turnstile?.execute) {
            (window as any).turnstile.execute(widgetId);
          }
        } catch (err) {
          console.error("[turnstile] render initialization error", err);
        }
      }
    };

    // Check if global turnstile script is available
    if (typeof window !== "undefined" && (window as any).turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (typeof window !== "undefined" && (window as any).turnstile) {
          renderWidget();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }

    return () => {
      if (widgetId && typeof window !== "undefined" && (window as any).turnstile?.remove) {
        try {
          (window as any).turnstile.remove(widgetId);
        } catch (err) {
          // ignore cleanup failures
        }
      }
    };
  }, [onVerify, widgetRef]);

  return <div ref={containerRef} className="hidden" aria-hidden="true" />;
}
