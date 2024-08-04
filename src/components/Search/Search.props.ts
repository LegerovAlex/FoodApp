import { InputHTMLAttributes } from "react";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  onSearch?: (value: string) => void;
}
