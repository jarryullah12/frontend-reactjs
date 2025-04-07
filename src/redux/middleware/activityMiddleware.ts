import { Middleware } from 'redux';
import {
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  loadMoreActivitiesRequest,
  loadMoreActivitiesSuccess,
  loadMoreActivitiesFailure,
  ActivityItem
} from '../slices/activitySlice';

// Mock activity data
const mockActivities: ActivityItem[] = [
  {
    id: 1,
    user: {
      name: 'Sam Lanson',
      image: 'https://randomuser.me/api/portraits/men/72.jpg'
    },
    action: 'update a playlist on',
    target: 'webstica',
    time: 'Just now',
    visibility: 'Public'
  },
  {
    id: 2,
    user: {
      name: 'Billy Vasquez',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    action: 'save a',
    target: 'link',
    time: '2min',
    visibility: 'only me'
  },
  {
    id: 3,
    user: {
      name: 'Sam Lanson',
      image: 'https://randomuser.me/api/portraits/men/72.jpg',
      initials: 'SM'
    },
    action: 'liked',
    targetUser: 'Frances Guerrero',
    targetAction: 'add comment',
    extraText: 'This is the best picture I have come across today....',
    time: '1hr'
  },
  {
    id: 4,
    user: {
      name: 'Judy Nguyen',
      image: 'https://randomuser.me/api/portraits/women/64.jpg'
    },
    action: 'likes',
    targetUser: 'Jacqueline Miller',
    targetAction: 'Photos',
    reactions: ['👍', '👌', '👍'],
    time: '4hr'
  },
  {
    id: 5,
    user: {
      name: 'Larry Lawson',
      image: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    action: 'Replied to your comment on',
    target: 'Blogzine blog theme',
    comment: 'Yes, I am so excited to see it live. 👍',
    time: '10hr'
  }
];

// More mock activities for pagination
const moreMockActivities: ActivityItem[] = [
  {
    id: 6,
    user: {
      name: 'Amanda Reed',
      image: 'https://randomuser.me/api/portraits/women/22.jpg'
    },
    action: 'shared your post',
    time: '12hr',
    visibility: 'Public'
  },
  {
    id: 7,
    user: {
      name: 'Dennis Barrett',
      image: 'https://randomuser.me/api/portraits/men/15.jpg'
    },
    action: 'commented on your photo',
    comment: 'This looks amazing! Where was this taken?',
    time: '1d',
  },
  {
    id: 8,
    user: {
      name: 'Louis Ferguson',
      image: 'https://randomuser.me/api/portraits/men/20.jpg',
      initials: 'LF'
    },
    action: 'reacted to your comment',
    reactions: ['❤️', '👏'],
    time: '2d'
  },
  {
    id: 9,
    user: {
      name: 'Carolyn Ortiz',
      image: 'https://randomuser.me/api/portraits/women/30.jpg'
    },
    action: 'mentioned you in a',
    target: 'comment',
    time: '3d',
    visibility: 'Friends'
  },
  {
    id: 10,
    user: {
      name: 'Frances Guerrero',
      image: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    action: 'invited you to like a page',
    target: 'Webestica Community',
    time: '1w',
    visibility: 'Public'
  }
];

// Activity middleware
const activityMiddleware: Middleware = store => next => action => {
  // First pass the action to the next middleware or reducer
  const result = next(action);

  // Then handle specific actions
  if (fetchActivitiesRequest.match(action)) {
    // Simulate API call to fetch activities
    setTimeout(() => {
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use the mock data
        store.dispatch(fetchActivitiesSuccess(mockActivities));
      } catch (error) {
        // Handle errors
        let errorMessage = 'Failed to fetch activities';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        store.dispatch(fetchActivitiesFailure(errorMessage));
      }
    }, 800); // Simulate network delay
  }

  if (loadMoreActivitiesRequest.match(action)) {
    // Simulate API call to load more activities
    setTimeout(() => {
      try {
        // In a real app, this would be an API call with pagination
        // For demo purposes, we'll use the additional mock data
        const state = store.getState();
        const page = state.activity.page;
        
        // Simulate pagination - only return more data for the first "load more" request
        if (page === 1) {
          store.dispatch(loadMoreActivitiesSuccess(moreMockActivities));
        } else {
          // No more activities to load
          store.dispatch(loadMoreActivitiesSuccess([]));
        }
      } catch (error) {
        // Handle errors
        let errorMessage = 'Failed to load more activities';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        store.dispatch(loadMoreActivitiesFailure(errorMessage));
      }
    }, 800); // Simulate network delay
  }

  return result;
};

export default activityMiddleware;
