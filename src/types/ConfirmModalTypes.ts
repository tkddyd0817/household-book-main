// export interface ConfirmModalProps {
//   open: boolean;
//   title?: string;
//   message: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }


export interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirmAction: () => void;
  onCancelAction: () => void;
}