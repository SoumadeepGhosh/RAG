"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { SendButton } from "./SendButton";

interface ChatInputProps {
  onSendMessage: (question: string) => Promise<void> | void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, isLoading = false }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question || isLoading) return;

    await onSendMessage(question);
    setInputValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="Ask a question..."
        className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-hidden transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-100 dark:focus:ring-neutral-100 dark:disabled:bg-neutral-800"
      />
      <SendButton disabled={!inputValue.trim()} isLoading={isLoading} />
    </form>
  );
}
