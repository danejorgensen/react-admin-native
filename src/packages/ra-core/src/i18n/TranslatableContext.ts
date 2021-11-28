import { createContext } from 'react';

// @ts-ignore
export const TranslatableContext = createContext<TranslatableContextValue>(
  // @ts-ignore
    undefined
);

export interface TranslatableContextValue {
    getLabel: GetTranslatableLabel;
    getSource: GetTranslatableSource;
    locales: string[];
    selectedLocale: string;
    selectLocale: SelectTranslatableLocale;
}

export type GetTranslatableSource = (field: string, locale?: string) => string;
export type GetTranslatableLabel = (field: string, label?: string) => string;
export type SelectTranslatableLocale = (locale: string) => void;
