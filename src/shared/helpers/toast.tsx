import AppToast, { type AppToastVariant } from "@/components/common/AppToast";
import { toast as notify, type ToastOptions } from "react-toastify";

type AppToastContent =
  | string
  | {
      title: string;
      description?: string;
    };

const defaultTitles: Record<AppToastVariant, string> = {
  success: "Success",
  error: "Request failed",
  info: "Notice",
};

function resolveContent(
  variant: AppToastVariant,
  content: AppToastContent,
): { title: string; description?: string } {
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (!trimmed) {
      return { title: defaultTitles[variant] };
    }

    return {
      title: defaultTitles[variant],
      description: trimmed,
    };
  }

  return {
    title: content.title,
    description: content.description?.trim() || undefined,
  };
}

function showToast(
  variant: AppToastVariant,
  content: AppToastContent,
  options?: ToastOptions,
): void {
  const { title, description } = resolveContent(variant, content);

  notify(
    ({ closeToast }) => (
      <AppToast
        variant={variant}
        title={title}
        description={description}
        onClose={closeToast}
      />
    ),
    {
      ...options,
      className: "app-toast-host",
      icon: false,
      closeButton: false,
    },
  );
}

export const toast = {
  success: (content: AppToastContent, options?: ToastOptions) =>
    showToast("success", content, options),
  error: (content: AppToastContent, options?: ToastOptions) =>
    showToast("error", content, options),
  info: (content: AppToastContent, options?: ToastOptions) =>
    showToast("info", content, options),
};
