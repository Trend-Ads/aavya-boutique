"use client";

import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AdminDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  searchable?: boolean;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
  className?: string;
}

export default function AdminDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  required = false,
  error,
  helperText,
  disabled = false,
  searchable = false,
  size = "md",
  style,
  className = "",
}: AdminDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Selected option details
  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen, searchable]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  // Filter options based on search query
  const filteredOptions = options.filter((opt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      opt.label.toLowerCase().includes(q) ||
      (opt.description && opt.description.toLowerCase().includes(q))
    );
  });

  // Size styling
  const sizeStyles = {
    sm: {
      padding: "0.45rem 0.75rem",
      fontSize: "0.8rem",
      minHeight: "34px",
    },
    md: {
      padding: "0.65rem 0.9rem",
      fontSize: "0.875rem",
      minHeight: "42px",
    },
    lg: {
      padding: "0.8rem 1.1rem",
      fontSize: "0.95rem",
      minHeight: "48px",
    },
  }[size];

  return (
    <div
      ref={dropdownRef}
      className={`admin-dropdown-root ${className}`}
      style={{
        position: "relative",
        width: "100%",
        ...style,
      }}
    >
      {/* Optional Label */}
      {label && (
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--color-charcoal, #171717)",
            marginBottom: "0.4rem",
          }}
        >
          <span>{label}</span>
          {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.65rem",
          backgroundColor: disabled ? "#f9fafb" : "#ffffff",
          color: selectedOption ? "var(--color-charcoal, #171717)" : "#9ca3af",
          border: error
            ? "1px solid #ef4444"
            : isOpen
            ? "1px solid var(--color-charcoal, #171717)"
            : "1px solid #d1d5db",
          borderRadius: "8px",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          boxShadow: isOpen
            ? "0 0 0 2px rgba(23, 23, 23, 0.08)"
            : "0 1px 2px rgba(0, 0, 0, 0.03)",
          transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
          ...sizeStyles,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0, flex: 1, textAlign: "left" }}>
          {selectedOption?.icon && (
            <span style={{ display: "inline-flex", flexShrink: 0 }}>
              {selectedOption.icon}
            </span>
          )}
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: selectedOption ? 500 : 400,
            }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.15rem 0.45rem",
                borderRadius: "10px",
                backgroundColor: "#f3f4f6",
                color: "#4b5563",
                flexShrink: 0,
              }}
            >
              {selectedOption.badge}
            </span>
          )}
        </div>

        {/* Chevron Icon with smooth 180deg flip */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isOpen ? "var(--color-charcoal, #171717)" : "#9ca3af"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 60,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
            animation: "fadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Optional Search Bar inside dropdown */}
          {(searchable || options.length > 6) && (
            <div
              style={{
                padding: "0.5rem 0.65rem",
                borderBottom: "1px solid #f3f4f6",
                backgroundColor: "#fafafa",
              }}
            >
              <div style={{ position: "relative" }}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to filter..."
                  style={{
                    width: "100%",
                    padding: "0.45rem 0.65rem",
                    paddingLeft: "1.75rem",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    fontSize: "0.8rem",
                    outline: "none",
                    backgroundColor: "#ffffff",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2.5"
                  style={{
                    position: "absolute",
                    left: "0.6rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          )}

          {/* Options List */}
          <div
            role="listbox"
            style={{
              maxHeight: "240px",
              overflowY: "auto",
              padding: "0.35rem",
            }}
          >
            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: "0.85rem 1rem",
                  fontSize: "0.82rem",
                  color: "#9ca3af",
                  textAlign: "center",
                }}
              >
                No matching options
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      if (option.disabled) return;
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.75rem",
                      padding: "0.55rem 0.75rem",
                      borderRadius: "6px",
                      cursor: option.disabled ? "not-allowed" : "pointer",
                      backgroundColor: isSelected
                        ? "rgba(23, 23, 23, 0.05)"
                        : "transparent",
                      color: option.disabled
                        ? "#9ca3af"
                        : isSelected
                        ? "var(--color-charcoal, #171717)"
                        : "#374151",
                      transition: "background-color 0.12s ease",
                      fontSize: "0.85rem",
                    }}
                    onMouseEnter={(e) => {
                      if (!option.disabled && !isSelected) {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!option.disabled && !isSelected) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0, flex: 1 }}>
                      {option.icon && (
                        <span style={{ display: "inline-flex", flexShrink: 0 }}>
                          {option.icon}
                        </span>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: isSelected ? 600 : 400,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {option.label}
                        </div>
                        {option.description && (
                          <div
                            style={{
                              fontSize: "0.73rem",
                              color: "#6b7280",
                              marginTop: "0.1rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                      {option.badge && (
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 500,
                            padding: "0.15rem 0.45rem",
                            borderRadius: "10px",
                            backgroundColor: isSelected ? "var(--color-charcoal, #171717)" : "#f3f4f6",
                            color: isSelected ? "#ffffff" : "#6b7280",
                          }}
                        >
                          {option.badge}
                        </span>
                      )}
                      {isSelected && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--color-charcoal, #171717)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Error or Helper text */}
      {error ? (
        <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.3rem" }}>
          {error}
        </p>
      ) : helperText ? (
        <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.3rem" }}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
