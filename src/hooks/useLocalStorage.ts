'use client';

import { useState, useEffect, useCallback } from 'react';

// Custom event for cross-component localStorage sync
const LOCAL_STORAGE_CHANGE = 'local-storage-change';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    setIsHydrated(true);
  }, [key]);

  // Listen for changes from other components using the same key
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === key) {
        setStoredValue(detail.value);
      }
    };
    window.addEventListener(LOCAL_STORAGE_CHANGE, handler);
    return () => window.removeEventListener(LOCAL_STORAGE_CHANGE, handler);
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Notify other components using the same key
        window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_CHANGE, {
          detail: { key, value: valueToStore }
        }));
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [isHydrated ? storedValue : initialValue, setValue];
}
