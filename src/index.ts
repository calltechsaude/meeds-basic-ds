// utils
export { cn } from './utils/cn'
export { initialsOf } from './utils/initials'
export { hashColorStyle } from './utils/hashColor'
export { applyBrand } from './utils/applyBrand'

// hooks
export { useTheme, themeInitScript, type Theme } from './hooks/useTheme'
export { useClickOutside } from './hooks/useClickOutside'

// ações
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button'
export { IconButton, type IconButtonProps, type IconButtonVariant } from './components/IconButton'

// formulário
export { Form } from './components/Form'
export { Field, FieldError, type FieldProps } from './components/Field'
export { FieldContext, useFieldContext, INVALID_CONTROL_CLASS } from './components/fieldContext'
export {
  Input,
  PasswordInput,
  LockedInput,
  Textarea,
  CONTROL_BASE_CLASS,
  type InputProps,
  type TextareaProps,
} from './components/Input'
export { SearchInput, type SearchInputProps } from './components/SearchInput'
export { Checkbox, type CheckboxProps } from './components/Checkbox'
export { Toggle, type ToggleProps } from './components/Toggle'

// exibição
export { Badge, CountBadge, StatusDot, type BadgeProps, type BadgeTone } from './components/Badge'
export { Avatar, type AvatarProps, type AvatarVariant } from './components/Avatar'
export { IconTile, type IconTileProps, type IconTileTone } from './components/IconTile'
export {
  Card,
  SectionCard,
  KpiCard,
  SectionLabel,
  type CardProps,
  type SectionCardProps,
  type KpiCardProps,
} from './components/Card'
export { PageHeader, PageContainer, type PageHeaderProps } from './components/PageHeader'
export { InfoRow, type InfoRowProps } from './components/DescriptionList'
export { ListHeader, ListItem, type ListItemProps } from './components/List'
export { Tabs, type TabsProps, type TabItem } from './components/Tabs'
export { ProgressBar, type ProgressBarProps } from './components/ProgressBar'

// feedback
export { Alert, type AlertProps, type AlertTone } from './components/Alert'
export { EmptyState, ErrorState, type EmptyStateProps, type ErrorStateProps } from './components/EmptyState'
export { Spinner, CenteredSpinner, type SpinnerProps } from './components/Spinner'
export { Skeleton, type SkeletonProps } from './components/Skeleton'
export { ToastProvider, useToast, type ToastType } from './components/Toast'

// overlays
export { Modal, type ModalProps, type ModalSize } from './components/Modal'
export { ConfirmDialog, type ConfirmDialogProps } from './components/ConfirmDialog'

// utilitários de UI
export { ThemeToggle, type ThemeToggleProps } from './components/ThemeToggle'
export { InfiniteScroll, type InfiniteScrollProps } from './components/InfiniteScroll'
