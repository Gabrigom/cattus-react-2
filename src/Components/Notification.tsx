import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Switch } from '@/Components/ui/switch';
import StatusChange from './StatusChange';

// Types
type StatusType = 'critical' | 'attention' | 'healthy';

interface NotificationItem {
  id: string;
  catId: string;
  catName: string;
  catImageUrl: string;
  prevStatus?: StatusType;
  newStatus: StatusType;
  reason: string;
  date: string;
  time: string;
  isRead: boolean;
  type?: 'improvement' | 'decline' | 'same';
}

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  // Mock notifications data
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      catId: '0001',
      catName: 'Pompeu',
      catImageUrl: '/public/imgs/cat_sample.jpg',
      newStatus: 'critical',
      reason: 'falta de alimentação',
      date: '29/01',
      time: '11:27',
      isRead: false,
      type: 'decline'
    },
    {
      id: '2',
      catId: '0002',
      catName: 'Pompeu',
      catImageUrl: '/public/imgs/cat_sample.jpg',
      prevStatus: 'critical',
      newStatus: 'healthy',
      reason: '',
      date: '29/01',
      time: '11:27',
      isRead: false,
      type: 'improvement'
    },
    {
      id: '3',
      catId: '0003',
      catName: 'Pompeu',
      catImageUrl: '/public/imgs/cat_sample.jpg',
      prevStatus: 'attention',
      newStatus: 'attention',
      reason: 'falta de alimentação',
      date: '30/01',
      time: '18:33',
      isRead: false,
      type: 'same'
    },
    {
      id: '4',
      catId: '0004',
      catName: 'Pompeu',
      catImageUrl: '/public/imgs/cat_sample.jpg',
      prevStatus: 'critical',
      newStatus: 'healthy',
      reason: '',
      date: '29/01',
      time: '11:27',
      isRead: true,
      type: 'improvement'
    },
    {
      id: '5',
      catId: '0005',
      catName: 'Pompeu',
      catImageUrl: '/public/imgs/cat_sample.jpg',
      newStatus: 'attention',
      reason: 'falta de alimentação',
      date: '30/01',
      time: '18:33',
      isRead: true,
      type: 'same'
    }
  ]);

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  // Toggle notification panel
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, isRead: true }))
    );
  };

  // Filter notifications based on showUnreadOnly toggle
  const filteredNotifications = showUnreadOnly
    ? notifications.filter(notif => !notif.isRead)
    : notifications;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative text-gray-300 hover:text-white hover:bg-gray-800"
        onClick={toggleNotifications}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="text-lg font-medium text-white">Notificações</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-gray-700"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Filter toggle */}
          <div className="px-4 py-2 flex items-center justify-between border-b border-gray-800">
            <span className="text-sm text-gray-300">Mostrar não lidos</span>
            <Switch 
              checked={showUnreadOnly} 
              onCheckedChange={setShowUnreadOnly}
            />
          </div>

          {/* Notifications list */}
          <div className="max-h-96 overflow-y-auto p-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <StatusChange 
                  key={notification.id}
                  catId={notification.catId}
                  catName={notification.catName}
                  catImageUrl={notification.catImageUrl}
                  prevStatus={notification.prevStatus}
                  newStatus={notification.newStatus}
                  reason={notification.reason}
                  date={notification.date}
                  time={notification.time}
                  isRead={notification.isRead}
                  type={notification.type}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">
                Não há notificações para exibir
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;