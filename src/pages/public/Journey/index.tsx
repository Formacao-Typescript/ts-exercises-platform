import React from 'react';
// import MonacoMockup from '../../../assets/monaco-mockup.png';

import ExerciseRenderer from '@/components/ExerciseRenderer';
// import MonacoEditor from '@/components/MonacoEditor';
import { Alert, Card, Progress } from 'flowbite-react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { ITopic } from '@/types';
import { useJourney } from '@/hooks';

const Journey: React.FC = () => {
  const { journeyId, topicId } = useParams<{
    journeyId: string;
    topicId: string;
  }>();
  const journey = useJourney(journeyId);
  const navigate = useNavigate();

  if (topicId) return <Outlet />;

  if (!journey)
    return (
      <div className="p-4 bg-gray-900 text-white">
        <h1>Journey not found</h1>
      </div>
    );

  const actions = {
    navigateToTopic: (topic: ITopic) => {
      console.log('navigateToTopic', topic.id);
      const topicId = topic.id;
      // TODO: here we can get the latest activity the user is in that topic
      const activityId = topic.activities[0].id;
      // navigate(`topic/${topicId}/activity/${activityId}`);
      navigate(`topic/${topicId}?activityId=${activityId}`);
    },
  };

  return (
    <div className="p-4 w-full bg-gray-900 text-white">
      <h1>{journey.name}</h1>
      <h2>{journey.shortDescription}</h2>
      <h4>{journey.longDescription}</h4>

      <div className="grid grid-cols-3 gap-4">
        {journey.topics.map(topic => (
          <div key={topic.id} className="col-span-1">
            <Card
              className="max-w-sm"
              renderImage={() => (
                <img
                  src="https://placehold.co/500x500"
                  width={500}
                  height={500}
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
      <Alert color="info">
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </Alert>
      {/* <MonacoEditor code="console.log('banana')" /> */}
      <ExerciseRenderer source="exercises/SAMPLE.md"></ExerciseRenderer>
    </div>
  );
};

export default Journey;
