"use client";

import type { ReactNode } from "react";
import { Icon } from "./Icon";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  /** Descendant listbox (autocomplete dropdown) rendered below the input, positioned by the parent. */
  children?: ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * Prominent search bar primitive: icon + text input + clear button +
 * submit button. The autocomplete listbox is passed in as `children` so
 * this stays a small presentational primitive; useSearch owns the logic.
 */
export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Search by title, author, subject, or ISBN...",
  children,
  inputProps,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-[672px]">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
        className="relative flex w-full items-center gap-2 rounded-full bg-white p-1.5 shadow-md"
      >
        <span className="flex items-center pl-3.5 pr-1">
          <Icon name="home-hero-search" />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-3 font-sans text-[15px] text-text-primary placeholder:text-text-secondary focus:outline-none"
          aria-label="Search the catalog"
          autoComplete="off"
          {...inputProps}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search query"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-text-secondary hover:text-text-primary focus-ring"
          >
            <Icon name="clear-x" />
          </button>
        )}
        <button
          type="submit"
          className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-brand-mint px-6 py-3 font-sans text-[14px] font-semibold leading-[18px] tracking-[0.14px] text-white shadow-xs transition-colors hover:bg-brand-teal focus-ring"
        >
          Search
          <Icon name="home-hero-search-arrow" />
        </button>
      </form>
      {children}
    </div>
  );
}
