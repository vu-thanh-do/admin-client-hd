export type NotificationType = 'message' | 'update' | 'reminder'

export interface Notification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
  type: NotificationType
}

export interface NotificationIcons {
  [key: string]: string
  message: string
  update: string
  reminder: string
  default: string
}

export interface NotificationListProps {
  notifications: Notification[]
  handleNotificationClick: (id: number) => void
} 