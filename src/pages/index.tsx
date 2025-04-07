import React from 'react';
import Layout from '../components/Layout';
import Feed from '../components/Feed';
import PostComposer from '../components/PostComposer';
import Stories from '../components/Stories';

const Home = () => {
  return (
    <Layout>
      {/* Main Content Column */}
      <div className="flex flex-col">
        {/* Post Composer */}
        <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-sm p-4 dark:border dark:border-dark-border transition-colors">
          <PostComposer />
        </div>

        {/* Stories */}
        <div className="mt-4">
          <Stories />
        </div>

        {/* Feed Content */}
        <div className="mt-4">
          <Feed />
        </div>
      </div>
    </Layout>
  );
};

export default Home; 