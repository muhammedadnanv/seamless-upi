
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
    const baseClasses = "w-3 h-3 rounded-full flex-shrink-0 mt-1.5 shadow-sm";
    switch (type) {
      case 'success':
        return <div className={`${baseClasses} bg-gradient-to-r from-green-400 to-emerald-500`} />;
      case 'error':
        return <div className={`${baseClasses} bg-gradient-to-r from-red-400 to-rose-500`} />;
      case 'warning':
        return <div className={`${baseClasses} bg-gradient-to-r from-yellow-400 to-amber-500`} />;
      default:
        return <div className={`${baseClasses} bg-gradient-to-r from-blue-400 to-cyan-500`} />;
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) return "bg-gray-50/50 dark:bg-gray-800/30 border-l-4 border-l-gray-300 dark:border-l-gray-600";
    
    switch (type) {
      case 'success':
        return "bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-l-green-400";
      case 'error':
        return "bg-gradient-to-r from-red-50/80 to-rose-50/80 dark:from-red-900/20 dark:to-rose-900/20 border-l-4 border-l-red-400";
      case 'warning':
        return "bg-gradient-to-r from-yellow-50/80 to-amber-50/80 dark:from-yellow-900/20 dark:to-amber-900/20 border-l-4 border-l-yellow-400";
      default:
        return "bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-l-blue-400";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative rounded-full h-10 w-10 group glass-panel hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <BellRing className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-lg border-2 border-white dark:border-gray-900"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
          {unreadCount > 0 && (
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 border-0 shadow-2xl glass-card backdrop-blur-xl" align="end">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded-xl shadow-sm">
                <BellRing size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
            </div>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="h-8 px-3 text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 rounded-lg shadow-sm transition-all duration-300"
                  >
                    <CheckCheck size={14} className="mr-1.5" />
                    Mark all read
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllNotifications}
                  className="h-8 px-3 text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 hover:text-red-700 rounded-lg shadow-sm transition-all duration-300"
                >
                  <Trash2 size={14} className="mr-1.5" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <ScrollArea className="max-h-96">
          {notifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <BellRing className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-1">No notifications yet</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">We'll notify you when something happens</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10 dark:divide-gray-700/50">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id} 
                  className={`p-5 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300 ${getNotificationBgColor(notification.type, notification.read)} group cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                            notification.read 
                              ? 'text-gray-600 dark:text-gray-400' 
                              : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}>
                            {notification.title}
                          </div>
                          <div className={`text-sm leading-relaxed transition-colors duration-300 ${
                            notification.read 
                              ? 'text-gray-500 dark:text-gray-500' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.message}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                            <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => markAsRead(notification.id)}
                              className="h-7 w-7 p-0 rounded-lg bg-white/50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                            >
                              <Check size={12} className="text-blue-600 dark:text-blue-400" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeNotification(notification.id)}
                            className="h-7 w-7 p-0 rounded-lg bg-white/50 dark:bg-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300"
                          >
                            <Trash2 size={12} className="text-red-500 dark:text-red-400" />
                          </Button>
                        </div>
                      </div>
                      {notification.action && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={notification.action.onClick}
                          className="mt-3 h-8 text-xs bg-white/50 dark:bg-gray-700/50 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-300"
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
