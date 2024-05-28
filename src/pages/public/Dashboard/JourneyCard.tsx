import React from 'react';
import { IJourney } from '@/types/index';

interface Props {
  journey: IJourney;
  onClick?: () => void;
}

import { Progress } from 'flowbite-react';
import BubbleCard from '@/components/BubbleCard';

const JourneyCard: React.FC<Props> = ({ journey, onClick }) => {
  return (
    <BubbleCard onClick={onClick}>
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {journey.name}
      </h3>
      <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-white">
        {journey.shortDescription}
      </span>
      <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400 transition-colors duration-500 ease-in-out group-hover:text-white">
        {journey.longDescription}
      </p>
      <Progress
        progress={
          +(((journey.progress || 0) / journey.topicCount) * 100).toFixed(2)
        }
        progressLabelPosition="outside"
        textLabel={`${journey.progress || 0}/${
          journey.topicCount
        } Temas explorados`}
        textLabelPosition="outside"
        // color="green"
        size="lg"
        labelProgress
        labelText
      />
    </BubbleCard>
  );
};

export default JourneyCard;
