
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BellRing, Check, Trash2, CheckCheck } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationBell: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications();

  const getNotificationIcon = (type: string) => {
    const baseClasses = "w-2 h-2 rounded-full flex-shrink-0 mt-2";
    switch (type) {
      case 'success':
        return <div className={`${baseClasses} bg-green-500`} />;
      case 'error':
        return <div className={`${baseClasses} bg-red-500`} />;
      case 'warning':
        return <div className={`${baseClasses} bg-yellow-500`} />;
      default:
        return <div className={`${baseClasses} bg-blue-500`} />;
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) return "bg-gray-50/50 dark:bg-gray-800/50";
    
    switch (type) {
      case 'success':
        return "bg-green-50/80 dark:bg-green-900/20";
      case 'error':
        return "bg-red-50/80 dark:bg-red-900/20";
      case 'warning':
        return "bg-yellow-50/80 dark:bg-yellow-900/20";
      default:
        return "bg-blue-50/80 dark:bg-blue-900/20";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-9 w-9 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 relative shadow-sm hover:shadow-md"
        >
          <BellRing className="h-5 w-5 text-blue-600" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 border-0 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md" align="end">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BellRing size={16} />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {unreadCount} new
                </Badge>
              )}
            </h3>
            {notifications.length > 0 && (
              <div className="flex gap-1">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="h-7 px-2 text-xs hover:bg-blue-100 dark:hover:bg-blue-900/20"
                  >
                    <CheckCheck size={12} className="mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllNotifications}
                  className="h-7 px-2 text-xs hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={12} className="mr-1" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <ScrollArea className="max-h-96">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <BellRing className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">No notifications yet</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">We'll notify you when something happens</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200 ${getNotificationBgColor(notification.type, notification.read)}`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${notification.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            {notification.title}
                          </div>
                          <div className={`text-sm mt-1 ${notification.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {notification.message}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                            >
                              <Check size={12} />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </div>
                      {notification.action && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={notification.action.onClick}
                          className="mt-2 h-7 text-xs"
                        >
                          {notification.action.label}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
