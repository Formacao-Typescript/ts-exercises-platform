import React from 'react';
import { Card, Progress } from 'flowbite-react';
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
    <div className="p-4 w-full bg-gray-900 text-white">
      <div className="format dark:format-invert mb-4">
        <h1 className="mb-2">{journey.name}</h1>
        <h2 className="text-md text-gray-500 mt-2 mb-4">
          {journey.shortDescription}
        </h2>
        <p>{journey.longDescription}</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {journey.topics.map(topic => (
          <div key={topic.id} className="col-span-1">
            <Card
              className="max-w-sm"
              renderImage={() => (
                <img
                  src="https://placehold.co/300x300"
                  width={300}
                  height={300}
                  alt="image 1"
                />
              )}
              onClick={actions.navigateToTopic.bind(null, topic)}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {topic.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {topic.description}
              </p>
              <Progress
                progress={50}
                progressLabelPosition="outside"
                textLabel={'1/' + topic.activities.length + ' activities'}
                textLabelPosition="outside"
                size="lg"
                labelProgress
                labelText
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
