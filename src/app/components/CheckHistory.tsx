'use client'

import { useState } from 'react';
import { Clock, X, ChevronDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useCheckHistory, CheckHistoryItem } from '../../hooks/useCheckHistory';

interface CheckHistoryProps {
  onSelectDomain: (domain: string) => void;
}

export default function CheckHistory({ onSelectDomain }: CheckHistoryProps) {
  const { history, clearHistory, removeFromHistory } = useCheckHistory();
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) return null;

  const getStatusIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (score >= 50) return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <Clock className="w-4 h-4" />
        Recent ({history.length})
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Checks</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Clear all history?')) {
                    clearHistory();
                    setIsOpen(false);
                  }
                }}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={`${item.domain}-${item.timestamp}`}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDomain(item.domain);
                        setIsOpen(false);
                      }}
                      className="font-medium text-gray-900 hover:text-amber-600 text-left flex-1"
                    >
                      {item.domain}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(item.domain);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatDate(item.timestamp)}</span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(item.score)}
                        <span>Score: {item.score}</span>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                        item.dmarcStatus === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        D
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                        item.spfStatus === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        S
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                        item.dkimStatus === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        K
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-gray-50 text-xs text-gray-500 text-center">
              Click a domain to check it again
            </div>
          </div>
        </>
      )}
    </div>
  );
}
