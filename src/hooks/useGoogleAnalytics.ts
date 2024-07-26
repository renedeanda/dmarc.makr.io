
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
