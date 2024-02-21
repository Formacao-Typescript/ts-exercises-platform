import React from 'react';
import { Progress } from 'flowbite-react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { ITopic } from '@/types';
import { useJourney, useTopics } from '@/hooks';
import LoadSkeleton from '@/components/LoadSkeleton';
import { AiOutlinePicture } from 'react-icons/ai';

const Journey: React.FC = () => {
  const { journeyId, topicId } = useParams<{
    journeyId: string;
    topicId: string;
  }>();
  const [journey, isLoadingJourney] = useJourney(journeyId);
  const [topics, isLoadingTopics] = useTopics(journeyId);

  const navigate = useNavigate();

  // nested route rendering
  if (topicId) return <Outlet />;

  const actions = {
    navigateToTopic: (topic: ITopic) => {
      console.log('navigateToTopic', topic.id);
      const topicId = topic.id;
      navigate(`topic/${topicId}`);
    },
  };

  return (
    <>
      <div className="text-left mb-4">
        <LoadSkeleton
          isLoading={isLoadingJourney}
          skeleton={() => (
            <div className="w-full pr-4">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
          )}
        >
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {journey?.name}
          </h1>
          <h1 className="mb-4 text-2xl tracking-tight  text-gray-900 dark:text-gray-400">
            {journey?.shortDescription}
          </h1>
          <p className="font-light text-gray-500 mb-8 sm:text-xl dark:text-gray-400">
            {journey?.longDescription}
          </p>
        </LoadSkeleton>
      </div>
      <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-3">
        <LoadSkeleton
          isLoading={isLoadingTopics}
          skeleton={() => (
            <>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={'status' + i}
                    role="status"
                    className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse flex flex-col"
                  >
                    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700 mb-10">
                      <AiOutlinePicture size={32} className="text-gray-500" />
                    </div>
                    <div className="w-full pr-4">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                ))}
            </>
          )}
        >
          {topics.map(topic => (
            <div
              key={topic.id}
              className="bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 cursor-pointer flex flex-col"
              onClick={actions.navigateToTopic.bind(null, topic)}
            >
              <div className="rounded-lg w-full h-64 bg-gradient-radial from-gray-600 to-gray-800 flex flex-col justify-center items-center">
                <span className="w-full p-4 text-5xl bg-gradient-to-l from-trade-light-blue to-trade-blue inline-block text-transparent bg-clip-text break-words">
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
                  progress={
                    +((topic.progress / topic.activityCount) * 100).toFixed(2)
                  }
                  progressLabelPosition="outside"
                  textLabel={`${topic.progress}/${topic.activityCount} Atividades concluídas`}
                  textLabelPosition="outside"
                  size="lg"
                  labelProgress
                  labelText
                />
              </div>
            </div>
          ))}
        </LoadSkeleton>
      </div>
    </>
  );
};

export default Journey;
