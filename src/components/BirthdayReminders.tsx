import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { DEFAULT_GRAY_PROFILE_IMAGE } from '../assets/images/defaultImages';
import { sendBirthdayWishes, removeBirthdayReminder } from '../redux/slices/userSlice';
import { useSession } from '../contexts/SessionContext';

interface BirthdayRemindersProps {
  // You can add props if needed
}

const BirthdayReminders: React.FC<BirthdayRemindersProps> = () => {
  const dispatch = useAppDispatch();
  const birthdayReminders = useAppSelector(state => state.user.birthdayReminders);
  const { session } = useSession();
  
  // Get the first reminder (Your Birthday)
  const sessionUserReminder = birthdayReminders.find(reminder => reminder.name === 'Your Birthday');
  
  const handleSendWishes = () => {
    if (sessionUserReminder) {
      dispatch(sendBirthdayWishes(sessionUserReminder.id));
    }
  };
  
  const handleRemindLater = () => {
    if (sessionUserReminder) {
      dispatch(removeBirthdayReminder(sessionUserReminder.id));
    }
  };
  
  if (birthdayReminders.length === 0) {
    return null; // Don't show the component if there are no reminders
  }
  
  return (
    <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm overflow-hidden dark:border dark:border-dark-border transition-colors mb-4">
      <div className="p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Birthday Reminders</h3>
        
        <div>
          <div className="text-sm">
            {session.email ? (
              <>
                <span className="font-medium">{session.email}</span> and {birthdayReminders.length - 1} others have birthdays today.
              </>
            ) : (
              <span>{birthdayReminders.length} people have birthdays today.</span>
            )}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex mt-3 space-x-2">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
            onClick={handleSendWishes}
          >
            Send Wishes
          </button>
          <button 
            className="bg-gray-200 hover:bg-gray-300 dark:bg-dark-bg dark:hover:bg-opacity-80 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm transition-colors"
            onClick={handleRemindLater}
          >
            Remind Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayReminders;
