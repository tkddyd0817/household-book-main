export interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirmAction: () => void;
  onCancelAction: () => void;
}
