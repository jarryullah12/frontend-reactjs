import React, { useEffect } from 'react';
import Contacts from './Contacts';
import BirthdayReminders from './BirthdayReminders';
import RecentActivity from './RecentActivity';
import { useChats, useAppDispatch, useUser, useAppSelector } from '../redux/hooks';
import { fetchContactsAsync } from '../redux/slices/chatsSlice';
import { 
  fetchUserDataAsync, 
  sendBirthdayWishes, 
  removeBirthdayReminder, 
  removeActivity 
} from '../redux/slices/userSlice';

const RightSidebar = () => {
  const { contacts } = useChats();
  const { friends } = useUser();
  const dispatch = useAppDispatch();
  
  // Get birthday reminders and recent activities from Redux store
  const birthdayReminders = useAppSelector(state => state.user.birthdayReminders);
  const recentActivities = useAppSelector(state => state.user.recentActivities);
  
  // Load user data and contacts when component mounts
  useEffect(() => {
    // First fetch user data to get friends, birthday reminders, and recent activities
    dispatch(fetchUserDataAsync())
      .then(() => {
        // After user data is loaded, fetch contacts using friends
        if (friends && friends.length > 0) {
          dispatch(fetchContactsAsync(friends));
        } else {
          // If no friends, fetch default contacts
          dispatch(fetchContactsAsync());
        }
      });
  }, [dispatch]);
  
  // When friends change, update contacts
  useEffect(() => {
    if (friends && friends.length > 0) {
      dispatch(fetchContactsAsync(friends));
    }
  }, [friends, dispatch]);
  
  // Sample online users with random profile images - will be replaced by Redux data
  const onlineUsers = [
    {id: 1, name: 'Jane Cooper', avatar: 'https://randomuser.me/api/portraits/women/23.jpg', status: 'online'},
    {id: 2, name: 'Cody Fisher', avatar: 'https://randomuser.me/api/portraits/men/24.jpg', status: 'online'},
    {id: 3, name: 'Esther Howard', avatar: 'https://randomuser.me/api/portraits/women/25.jpg', status: 'online'},
    {id: 4, name: 'Jenny Wilson', avatar: 'https://randomuser.me/api/portraits/women/26.jpg', status: 'away'},
    {id: 5, name: 'Kristin Watson', avatar: 'https://randomuser.me/api/portraits/women/27.jpg', status: 'offline'},
    {id: 6, name: 'Cameron Williamson', avatar: 'https://randomuser.me/api/portraits/men/28.jpg', status: 'online'},
    {id: 7, name: 'Brooklyn Simmons', avatar: 'https://randomuser.me/api/portraits/women/29.jpg', status: 'online'},
  ];

  return (
    <aside className="hidden xl:block w-80 h-screen sticky top-16">
      {/* Birthday Reminders Component */}
      {birthdayReminders.length > 0 && <BirthdayReminders />}
      
      {/* Recent Activity Component */}
      {recentActivities.length > 0 && <RecentActivity />}
      
      {/* Contacts Component */}
      <Contacts contacts={contacts} />
      
      {/* Suggested Pages section removed */}
    </aside>
  );
};

export default RightSidebar;