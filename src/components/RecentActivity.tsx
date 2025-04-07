import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { DEFAULT_GRAY_PROFILE_IMAGE } from '../assets/images/defaultImages';
import { ActivityItem, removeActivity } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

interface RecentActivityProps {
  limit?: number;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ limit = 3 }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activities = useAppSelector(state => state.user.recentActivities);
  const { session } = useSession();
  
  // Limit the number of activities to display
  const displayActivities = activities.slice(0, limit);
  
  const handleSeeAll = () => {
    navigate('/notifications-page');
  };
  
  const handleDismissActivity = (id: string) => {
    dispatch(removeActivity(id));
  };
  
  if (activities.length === 0) {
    return null; // Don't show the component if there are no activities
  }
  
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-4 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900 dark:text-white">Recent Activity</h3>
        <button 
          onClick={handleSeeAll}
          className="text-blue-500 text-sm hover:underline"
        >
          See all
        </button>
      </div>
      
      <div className="space-y-4">
        {displayActivities.map(activity => (
          <div key={activity.id} className="group relative">
            <div>
              <div className="text-sm">
                {session.email ? (
                  <>
                    <span className="font-medium">{session.email}</span> {activity.action}: "{activity.content}"
                  </>
                ) : (
                  <span>{activity.action}: "{activity.content}"</span>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.timestamp}</div>
            </div>
            <button 
              className="opacity-0 group-hover:opacity-100 absolute right-0 top-0 text-gray-400 hover:text-gray-600 transition-opacity"
              onClick={() => handleDismissActivity(activity.id)}
              aria-label="Dismiss notification"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;