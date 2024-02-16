import React from 'react';
import cn from 'classnames';
import { IJourney } from '@/types';

interface Props {
  journey: IJourney;
  onClick?: () => void;
}

import { Progress } from 'flowbite-react';

const JourneyCard: React.FC<Props> = ({ journey, onClick }) => {
  return (
    <div
      className={cn(
        'items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="h-full rounded-lg w-3/6 bg-gradient-radial from-gray-600 to-gray-800 flex flex-col justify-center items-center">
        <span className="text-6xl border-l text-white">TS</span>
        <span className="text-5xl bg-gradient-to-l from-indigo-500 to-blue-600 inline-block text-transparent bg-clip-text">
          Iniciante
        </span>
      </div>
      <div className="p-5 w-5/6">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {journey.name}
        </h3>
        <span className="text-gray-500 dark:text-gray-400">
          {journey.shortDescription}
        </span>
        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
          {journey.longDescription}
        </p>
        <Progress
          progress={journey.progress / journey.topicCount}
          progressLabelPosition="outside"
          textLabel={`${journey.progress}/${journey.topicCount} Temas explorados`}
          textLabelPosition="outside"
          size="lg"
          labelProgress
          labelText
        />
      </div>
    </div>
  );
};

export default JourneyCard;
