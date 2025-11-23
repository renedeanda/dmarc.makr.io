'use client'

import { useState, useEffect } from 'react';

export interface CheckHistoryItem {
  domain: string;
  timestamp: number;
  dmarcStatus: string;
  spfStatus: string;
  dkimStatus: string;
  score: number;
}

const MAX_HISTORY_ITEMS = 10;
const STORAGE_KEY = 'dmarc_check_history';

export function useCheckHistory() {
  const [history, setHistory] = useState<CheckHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setHistory(parsed);
        } catch (e) {
          console.error('Failed to parse check history:', e);
        }
      }
    }
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (typeof window !== 'undefined' && history.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }, [history]);

  const addToHistory = (item: Omit<CheckHistoryItem, 'timestamp'>) => {
    const newItem: CheckHistoryItem = {
      ...item,
      timestamp: Date.now()
    };

    setHistory(prev => {
      // Remove duplicate domains
      const filtered = prev.filter(h => h.domain !== item.domain);
      // Add new item to front and limit to MAX_HISTORY_ITEMS
      return [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const clearHistory = () => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const removeFromHistory = (domain: string) => {
    setHistory(prev => prev.filter(h => h.domain !== domain));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
}
