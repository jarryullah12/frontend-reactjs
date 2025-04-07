import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../redux/hooks';

// Define TypeScript interfaces
interface Notification {
  id: number;
  avatar: string;
  username: string;
  action: string;
  time: string;
  read: boolean;
  isSystem?: boolean;
}

const NotificationsPage: React.FC = () => {
  const { currentUser } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/women/42.jpg",
      username: "Sarah Johnson",
      action: "liked your post",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      username: "Michael Chen",
      action: "commented on your photo",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      avatar: "",
      username: "",
      action: "Your post received 50 views",
      time: "3 hours ago",
      read: true,
      isSystem: true
    },
    {
      id: 4,
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      username: "Emma Wilson",
      action: "started following you",
      time: "5 hours ago",
      read: true
    },
    {
      id: 5,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      username: "David Kim",
      action: "mentioned you in a comment",
      time: "Yesterday",
      read: true
    }
  ]);

  const [showMuteOptions, setShowMuteOptions] = useState(false);
  const [showDigestOptions, setShowDigestOptions] = useState(false);
  const [selectedMuteDuration, setSelectedMuteDuration] = useState("1h");
  const [selectedDigestTime, setSelectedDigestTime] = useState("morning");
  
  // New states for action modals
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
    // Show success toast
    alert("All notifications marked as read");
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMute = () => {
    setShowMuteOptions(!showMuteOptions);
    setShowDigestOptions(false);
  };

  const handleDigest = () => {
    setShowDigestOptions(!showDigestOptions);
    setShowMuteOptions(false);
  };

  const applyMute = () => {
    // Apply mute settings
    setShowMuteOptions(false);
    
    // Show success toast
    let duration = "";
    switch(selectedMuteDuration) {
      case "1h": duration = "1 hour"; break;
      case "8h": duration = "8 hours"; break;
      case "24h": duration = "24 hours"; break;
      case "forever": duration = "indefinitely"; break;
    }
    
    alert(`Notifications muted for ${duration}`);
  };

  const applyDigest = () => {
    // Apply digest settings
    setShowDigestOptions(false);
    
    // Show success toast
    let time = "";
    switch(selectedDigestTime) {
      case "morning": time = "morning (8:00 AM)"; break;
      case "afternoon": time = "afternoon (1:00 PM)"; break;
      case "evening": time = "evening (6:00 PM)"; break;
    }
    
    alert(`Daily digest set for ${time}`);
  };

  // Handle reply action
  const handleReply = (notification: Notification) => {
    setActiveNotification(notification);
    setShowReplyModal(true);
  };

  // Handle view action
  const handleView = (notification: Notification) => {
    setActiveNotification(notification);
    setShowViewModal(true);
  };

  // Handle profile action
  const handleProfile = (notification: Notification) => {
    setActiveNotification(notification);
    setShowProfileModal(true);
  };

  // Handle dismiss action
  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    // Show success toast
    alert("Notification dismissed");
  };

  // Handle sending reply
  const handleSendReply = () => {
    if (replyText.trim() === "") {
      alert("Please enter a reply");
      return;
    }
    
    // Here you would typically send the reply to an API
    alert(`Reply sent to ${activeNotification?.username}: ${replyText}`);
    setShowReplyModal(false);
    setReplyText("");
  };

  return (
    <div className="container-custom py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <Link to="/notifications-settings" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Notification Settings
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-4 mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              className="flex flex-col items-center justify-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              onClick={handleMute}
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mute Notifications</span>
            </button>
            
            <button 
              className="flex flex-col items-center justify-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              onClick={handleDigest}
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Digest</span>
            </button>
            
            <button 
              className="flex flex-col items-center justify-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              onClick={handleMarkAllRead}
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mark All Read</span>
            </button>
            
            <Link 
              to="/notification-history"
              className="flex flex-col items-center justify-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
            >
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Notification History</span>
            </Link>
          </div>

          {/* Mute Options */}
          {showMuteOptions && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Mute notifications for:</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="muteDuration" 
                    value="1h" 
                    checked={selectedMuteDuration === "1h"} 
                    onChange={() => setSelectedMuteDuration("1h")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">1 hour</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="muteDuration" 
                    value="8h" 
                    checked={selectedMuteDuration === "8h"} 
                    onChange={() => setSelectedMuteDuration("8h")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">8 hours</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="muteDuration" 
                    value="24h" 
                    checked={selectedMuteDuration === "24h"} 
                    onChange={() => setSelectedMuteDuration("24h")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">24 hours</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="muteDuration" 
                    value="forever" 
                    checked={selectedMuteDuration === "forever"} 
                    onChange={() => setSelectedMuteDuration("forever")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Indefinitely</span>
                </label>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded"
                  onClick={() => setShowMuteOptions(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={applyMute}
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* Digest Options */}
          {showDigestOptions && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Receive daily digest at:</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="digestTime" 
                    value="morning" 
                    checked={selectedDigestTime === "morning"} 
                    onChange={() => setSelectedDigestTime("morning")}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Morning (8:00 AM)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="digestTime" 
                    value="afternoon" 
                    checked={selectedDigestTime === "afternoon"} 
                    onChange={() => setSelectedDigestTime("afternoon")}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Afternoon (1:00 PM)</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="digestTime" 
                    value="evening" 
                    checked={selectedDigestTime === "evening"} 
                    onChange={() => setSelectedDigestTime("evening")}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Evening (6:00 PM)</span>
                </label>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary rounded"
                  onClick={() => setShowDigestOptions(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded"
                  onClick={applyDigest}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
          <div className="p-4 border-b border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Notifications</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-dark-border">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`flex items-start p-4 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                >
                  {notification.isSystem ? (
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden mr-3 flex-shrink-0 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <img src={notification.avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {notification.username && <span className="font-medium">{notification.username} </span>}
                      {notification.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    
                    {/* Action buttons for each notification */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {!notification.isSystem && (
                        <button 
                          className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                          onClick={() => handleReply(notification)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          Reply
                        </button>
                      )}
                      
                      <button 
                        className="inline-flex items-center px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                        onClick={() => handleView(notification)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      
                      {!notification.isSystem && (
                        <button 
                          className="inline-flex items-center px-2 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                          onClick={() => handleProfile(notification)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </button>
                      )}
                      
                      <button 
                        className="inline-flex items-center px-2 py-1 text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        onClick={() => handleDismiss(notification.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Dismiss
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {!notification.read && (
                      <>
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <button 
                          className="text-xs text-blue-500 hover:text-blue-600"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as read
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">You don't have any notifications yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Reply Modal */}
      {showReplyModal && activeNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reply to {activeNotification?.username}</h3>
              <button 
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                  <img src={activeNotification?.avatar} alt={activeNotification?.username} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-dark-bg p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{activeNotification?.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{activeNotification?.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activeNotification?.time}</p>
                </div>
              </div>
              
              <textarea
                className="w-full border border-gray-300 dark:border-dark-border rounded-lg p-3 text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-bg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-end space-x-2">
              <button 
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-bg rounded-md"
                onClick={() => setShowReplyModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={handleSendReply}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* View Notification Modal */}
      {showViewModal && activeNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-start mb-4">
                {activeNotification?.isSystem ? (
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden mr-3 flex-shrink-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <img src={activeNotification?.avatar} alt={activeNotification?.username} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex-1">
                  {!activeNotification?.isSystem && (
                    <p className="text-md font-medium text-gray-800 dark:text-gray-200">{activeNotification?.username}</p>
                  )}
                  <p className="text-md text-gray-800 dark:text-gray-200 mt-1">
                    {activeNotification?.username && !activeNotification?.isSystem ? (
                      <span className="font-medium">{activeNotification?.username} </span>
                    ) : null}
                    {activeNotification?.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{activeNotification?.time}</p>
                  
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Information</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This notification was received on {new Date().toLocaleDateString()} and is related to your recent activity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-between">
              <button 
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                onClick={() => {
                  handleDismiss(activeNotification?.id);
                  setShowViewModal(false);
                }}
              >
                Dismiss
              </button>
              
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Modal */}
      {showProfileModal && activeNotification && !activeNotification?.isSystem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{activeNotification?.username}'s Profile</h3>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img src={activeNotification?.avatar} alt={activeNotification?.username} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">{activeNotification?.username}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Product Designer</p>
                
                <div className="flex space-x-4 mt-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">248</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">1,842</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">526</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-dark-border pt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Product designer based in San Francisco. Passionate about creating intuitive and beautiful user experiences.
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-dark-border flex justify-between">
              <button 
                className="px-4 py-2 text-sm border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-md"
                onClick={() => setShowProfileModal(false)}
              >
                Message
              </button>
              
              <button 
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={() => setShowProfileModal(false)}
              >
                Follow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
