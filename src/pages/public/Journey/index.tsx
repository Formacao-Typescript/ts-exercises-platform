import React from 'react';
import { Progress } from 'flowbite-react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { ITopic } from '@/types';
import { useJourney } from '@/hooks';

const Journey: React.FC = () => {
  const { journeyId, topicId } = useParams<{
    journeyId: string;
    topicId: string;
  }>();
  const { journey, isLoading, isEmpty } = useJourney(journeyId);
  const navigate = useNavigate();

  if (topicId) return <Outlet />;

  if (isLoading) return <div>Loading...</div>;

  if (isEmpty || !journey)
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h1>Journey not found</h1>
      </div>
    );

  const actions = {
    navigateToTopic: (topic: ITopic) => {
      console.log('navigateToTopic', topic.id);
      const topicId = topic.id;
      navigate(`topic/${topicId}`);
    },
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-full">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="text-left mb-8 lg:mb-16">
            <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              {journey.name}
            </h1>
            <h1 className="mb-4 text-2xl tracking-tight  text-gray-900 dark:text-gray-400">
              {journey.shortDescription}
            </h1>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              {journey.longDescription}
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-4">
            {[...journey.topics, ...journey.topics, ...journey.topics].map(
              topic => (
                <div
                  className="bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 cursor-pointer flex flex-col"
                  onClick={actions.navigateToTopic.bind(null, topic)}
                >
                  <div className="rounded-lg max-w-sm h-300 bg-gradient-radial from-gray-600 to-gray-800 flex flex-col justify-center items-center">
                    <span className="w-full p-4 text-5xl bg-gradient-to-l from-indigo-500 to-blue-600 inline-block text-transparent bg-clip-text break-words">
                      {topic.name}
                    </span>
                  </div>
                  <div className="flex flex-col justify-between p-4 flex-grow">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                      {topic.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                      {topic.description}
                    </p>
                    <Progress
                      progress={topic.progress / topic.activityCount}
                      progressLabelPosition="outside"
                      textLabel={`${topic.progress}/${topic.activityCount} Atividades concluídas`}
                      textLabelPosition="outside"
                      size="lg"
                      labelProgress
                      labelText
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Journey;
