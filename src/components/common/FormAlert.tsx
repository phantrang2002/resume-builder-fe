import { ExclamationCircleOutlined } from "@ant-design/icons";

type FormAlertProps = {
  title: string;
  message: string;
};

export default function FormAlert({ title, message }: FormAlertProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-errorBorder bg-errorBg px-4 py-3.5"
    >
      <span className="flex h-5 shrink-0 items-center">
        <ExclamationCircleOutlined className="text-base text-errorDark" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-errorDark">{title}</p>
        <p className="text-xs font-normal leading-relaxed text-errorDark">{message}</p>
      </div>
    </div>
  );
}
