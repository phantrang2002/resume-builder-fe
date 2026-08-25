import { CloseOutlined } from "@ant-design/icons";
import { KeyboardEvent, useState } from "react";

type TagInputFieldProps = {
  id: string;
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

export default function TagInputField({
  id,
  label,
  tags,
  onChange,
  placeholder = "Type and press Enter…",
}: TagInputFieldProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value || tags.includes(value)) {
      return;
    }
    onChange([...tags, value]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(inputValue);
    }
    if (event.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-secondary">
        {label}
      </label>
      <div className="min-h-10 rounded-md border border-[#CFCCC5] bg-white px-2 py-1.5 focus-within:border-inputFocus focus-within:shadow-[0_0_0_1px_theme(colors.inputFocus)]">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="inline-flex items-center gap-1 rounded-md bg-[#EEF3F8] px-2 py-0.5 text-xs font-medium text-primary"
            >
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={() => removeTag(index)}
                className="text-subtle transition-colors hover:text-pageTitle"
              >
                <CloseOutlined className="text-[10px]" />
              </button>
            </span>
          ))}
          <input
            id={id}
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addTag(inputValue)}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="min-w-[120px] flex-1 border-none bg-transparent py-1 text-sm text-pageTitle outline-none placeholder:text-inputMuted"
          />
        </div>
      </div>
    </div>
  );
}
