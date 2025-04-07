import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchActivitiesRequest, loadMoreActivitiesRequest } from '../redux/slices/activitySlice';

const ActivityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('activity');
  
  const dispatch = useAppDispatch();
  const { activities, loading, hasMore } = useAppSelector(state => state.activity);
  
  useEffect(() => {
    // Fetch activities when component mounts
    dispatch(fetchActivitiesRequest());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(loadMoreActivitiesRequest());
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  // Profile data for the header
  const profile = {
    name: 'Sam Lanson',
    verified: true,
    connections: 250,
    role: 'Lead Developer',
    location: 'New Hampshire',
    joinDate: 'Nov 26, 2019',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070',
    profileImage: 'https://randomuser.me/api/portraits/men/72.jpg',
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg transition-colors">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <ProfileHeader 
          name={profile.name}
          verified={profile.verified}
          connections={profile.connections}
          role={profile.role}
          location={profile.location}
          joinDate={profile.joinDate}
          coverImage={profile.coverImage}
          profileImage={profile.profileImage}
        />
        
        <ProfileTabs onTabChange={handleTabChange} activeTab={activeTab} />
        
        <div className="bg-white dark:bg-dark-secondary rounded-lg shadow-sm p-6 dark:border dark:border-dark-border transition-colors">
          <h2 className="text-lg font-bold mb-4 dark:text-white">Activity feed</h2>
          
          {loading && activities.length === 0 && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {activities.length > 0 && (
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex">
                  <div className="mr-4">
                    {activity.user.initials ? (
                      <div className="w-10 h-10 bg-teal-500 dark:bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {activity.user.initials}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={activity.user.image} 
                          alt={activity.user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm dark:text-gray-200">
                          <span className="font-semibold dark:text-white">{activity.user.name}</span>{' '}
                          {activity.action}{' '}
                          {activity.targetUser && <span className="font-semibold dark:text-white">{activity.targetUser}'s</span>}{' '}
                          {activity.targetAction && <span>{activity.targetAction}</span>}{' '}
                          {activity.target && <span className="font-semibold dark:text-white">{activity.target}</span>}
                          {activity.extraText && <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.extraText}</div>}
                        </div>
                        
                        {activity.visibility && (
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full mr-1"></span>
                            <span>{activity.visibility}</span>
                          </div>
                        )}
                        
                        {activity.reactions && (
                          <div className="mt-2">
                            {activity.reactions.map((reaction, index) => (
                              <span key={index} className="text-base mr-1">{reaction}</span>
                            ))}
                          </div>
                        )}
                        
                        {activity.comment && (
                          <div className="bg-gray-100 dark:bg-dark-bg p-3 rounded-lg mt-3">
                            <p className="text-sm dark:text-gray-300">{activity.comment}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && activities.length > 0 && (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {hasMore && (
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="w-full py-2 bg-gray-100 dark:bg-dark-bg text-blue-500 dark:text-blue-400 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-dark-hover transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load more activity'}
                </button>
              )}
              
              {!hasMore && activities.length > 0 && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                  No more activities to load
                </div>
              )}
            </div>
          )}
          
          {!loading && activities.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No activities found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;