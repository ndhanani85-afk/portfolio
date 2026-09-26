import posthog from "posthog-js";

/**
 * Safely track custom business events in PostHog.
 * Checks for client-side window and PostHog initialization before emitting.
 */
export function trackPostHogEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  try {
    posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.warn("[PostHog] Failed to track event:", eventName, error);
  }
}

/**
 * Safely track high-intent button/link clicks in PostHog.
 */
export function trackPostHogClick(
  action: string,
  category: string = "interaction",
  properties?: Record<string, unknown>
): void {
  trackPostHogEvent("user_click", {
    action,
    category,
    ...properties,
  });
}

/**
 * Identify a user in PostHog after authentication or form completion.
 */
export function identifyPostHogUser(
  distinctId: string,
  userProperties?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  try {
    posthog.identify(distinctId, userProperties);
  } catch (error) {
    console.warn("[PostHog] Failed to identify user:", error);
  }
}

/**
 * Reset PostHog user identity on logout.
 */
export function resetPostHogUser(): void {
  if (typeof window === "undefined") return;
  try {
    posthog.reset();
  } catch (error) {
    console.warn("[PostHog] Failed to reset user:", error);
  }
}

export default posthog;
