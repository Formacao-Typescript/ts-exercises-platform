import React from 'react';
import { Progress } from 'flowbite-react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { ITopic } from 'types/index';
import { useJourney, useTopics } from '@/hooks';
import LoadSkeleton from '@/components/LoadSkeleton';
import { AiOutlinePicture } from 'react-icons/ai';
import BubbleCard from '@/components/BubbleCard';

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
      navigate(`topic/${topic.id}`);
    },
  };

  return (
    <div className="px-4 mx-auto lg:px-6">
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
      <div className="grid gap-8 mb-6 lg:mb-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
            <BubbleCard
              key={topic.id}
              onClick={actions.navigateToTopic.bind(null, topic)}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                {topic.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                {topic.description}
              </p>
              <Progress
                progress={
                  +(
                    ((topic.progress || 0) / topic.activityCount) *
                    100
                  ).toFixed(2)
                }
                progressLabelPosition="outside"
                textLabel={`${topic.progress || 0}/${
                  topic.activityCount
                } Atividades concluídas`}
                textLabelPosition="outside"
                size="lg"
                labelProgress
                labelText
              />
            </BubbleCard>
          ))}
        </LoadSkeleton>
      </div>
    </div>
  );
};

export default Journey;
