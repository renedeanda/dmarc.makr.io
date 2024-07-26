#!/usr/bin/env python3

import os

def update_file(file_path, content):
    print(f"Updating {file_path}...")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as f:
        f.write(content)
    print(f"{file_path} updated successfully.")

def main():
    # Update src/hooks/useGoogleAnalytics.ts
    use_google_analytics_ts = """
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (option: string, gaTrackingId: string, options: Record<string, unknown>) => void;
  }
}

export default function useGoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      window.gtag('config', GA_TRACKING_ID!, {
        page_path: pathname,
      });
    }
  }, [pathname]);
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
"""
    update_file("src/hooks/useGoogleAnalytics.ts", use_google_analytics_ts)

    print("\nAll files have been updated successfully!")
    print("\nNext steps:")
    print("1. Review the changes in the updated files")
    print("2. Ensure your Google Analytics ID is in your .env.local file as NEXT_PUBLIC_GA_ID")
    print("3. Run 'npm run dev' to start the development server and test the changes")
    print("4. If everything looks good, commit the changes to your git repository")

if __name__ == "__main__":
    main()