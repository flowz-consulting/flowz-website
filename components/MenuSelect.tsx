"use client";

import { useEffect, useId, useRef, useState } from "react";
import { fieldClass } from "@/lib/classes";

export type MenuOption = {
  value: string;
  label: string;
};

export function MenuSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Select",
}: {
  id: string;
  name?: string;
  label: string;
  options: readonly MenuOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);
  const describedBy = error ? `${id}-error` : undefined;

  function openMenu() {
    const selectedIndex = options.findIndex((option) => option.value === value);
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;

    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onOther(event: Event) {
      if ((event as CustomEvent<string>).detail !== id) setOpen(false);
    }

    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("flowz-menu", onOther);
    window.dispatchEvent(new CustomEvent("flowz-menu", { detail: id }));
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("flowz-menu", onOther);
    };
  }, [open, id]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  function choose(next: string) {
    onChange(next);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (
      !open &&
      (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      openMenu();
      return;
    }
    if (!open) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(options.length - 1, index + 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      setActive(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setActive(Math.max(0, options.length - 1));
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const option = options[active];
      if (option) choose(option.value);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {name ? <input type="hidden" name={name} value={value} /> : null}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={`${fieldClass} mt-2 flex cursor-pointer items-center justify-between gap-3 text-left ${
          error ? "border-danger" : ""
        }`}
      >
        <span className={selected ? "text-foreground" : "text-muted"}>
          {selected?.label ?? placeholder}
        </span>
        <span aria-hidden="true" className={`text-xs text-muted ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto border border-line bg-background py-1 shadow-[0_16px_40px_-24px_rgba(20,20,20,0.5)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === active;
            return (
              <li key={option.value} role="presentation">
                <button
                  id={`${listId}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(option.value)}
                  className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-base ${
                    isActive ? "bg-[#f6f6f6]" : "bg-background"
                  } ${isSelected ? "text-accent" : "text-foreground"}`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm leading-6 text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
