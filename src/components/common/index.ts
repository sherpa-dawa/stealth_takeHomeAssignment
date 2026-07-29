/**
 * Shared Components - Used across features
 * Re-exports components that live in this folder
 */

// UI Primitives (Radix-based)
export { Button } from "./Button";
export { Card, CardContent } from "./Card";
export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "./Dialog";
export { Input } from "./Input";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./Select";
export { Avatar } from "./Avatar";
export { Badge } from "./Badge";
export type { Toast } from "./Toast";

// Feature-specific shared components
export { default as RiskChip } from "./RiskChip";
export { default as StatusChip } from "./StatusChip";
export { default as EmptyState } from "./EmptyState";
export { default as ErrorState } from "./ErrorState";
export { default as LoadingState } from "./LoadingState";
export { default as ErrorBoundary } from "./ErrorBoundary";
