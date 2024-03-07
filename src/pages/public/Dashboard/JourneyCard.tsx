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
        'items-center bg-gray-50 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow sm:flex relative overflow-hidden group transition-transform duration-300 ease-in hover:scale-110',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <span className="background-sphere w-20 h-20 z-0 bg-branding-green absolute top-[-30px] right-[-30px] rounded-disform animate-spin-slow transition-all ease-in-out duration-300 group-hover:w-[600px] group-hover:h-[600px] group-hover:top-[-100px] group-hover:right-[-100px]"></span>
      <div className="p-5 z-10  ">
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
      </div>
    </div>
  );
};

export default JourneyCard;
