import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'holidayapp_currency';
const REFRESH_INTERVAL_MS = 1000 * 60 * 30;
const BASE_CURRENCY = 'USD';

export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'INR', label: 'Indian Rupee' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'AUD', label: 'Australian Dollar' },
  { code: 'CAD', label: 'Canadian Dollar' },
  { code: 'AED', label: 'UAE Dirham' },
] as const;

type SupportedCurrency = (typeof CURRENCIES)[number]['code'];

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  convertFromUsd: (usdAmount: number) => number;
  formatPrice: (usdAmount: number, options?: Intl.NumberFormatOptions) => string;
  ratesLastUpdated: string | null;
  isRatesLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const fallbackRates: Record<SupportedCurrency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  INR: 83.2,
  JPY: 149.4,
  AUD: 1.52,
  CAD: 1.37,
  AED: 3.67,
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedCurrency | null;
    return stored && CURRENCIES.some((item) => item.code === stored) ? stored : BASE_CURRENCY;
  });
  const [rates, setRates] = useState<Record<string, number>>(fallbackRates);
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string | null>(null);
  const [isRatesLoading, setIsRatesLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  useEffect(() => {
    let cancelled = false;

    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) {
          throw new Error('Unable to fetch currency rates');
        }

        const payload = await response.json();
        if (!cancelled && payload?.rates) {
          setRates(payload.rates);
          setRatesLastUpdated(new Date().toISOString());
        }
      } catch {
        if (!cancelled && !ratesLastUpdated) {
          setRates(fallbackRates);
        }
      } finally {
        if (!cancelled) {
          setIsRatesLoading(false);
        }
      }
    };

    fetchRates();
    const interval = window.setInterval(fetchRates, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [ratesLastUpdated]);

  const setCurrency = (nextCurrency: SupportedCurrency) => {
    setCurrencyState(nextCurrency);
  };

  const convertFromUsd = (usdAmount: number) => {
    const rate = rates[currency] ?? fallbackRates[currency] ?? 1;
    return usdAmount * rate;
  };

  const formatPrice = (usdAmount: number, options?: Intl.NumberFormatOptions) => {
    const amount = convertFromUsd(usdAmount);
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
      ...options,
    }).format(amount);
  };

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      convertFromUsd,
      formatPrice,
      ratesLastUpdated,
      isRatesLoading,
    }),
    [currency, ratesLastUpdated, isRatesLoading],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
