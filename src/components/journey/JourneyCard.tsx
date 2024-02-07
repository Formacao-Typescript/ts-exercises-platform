import React from 'react';
import cn from 'classnames';
import { IJourney } from '@/types';

interface Props {
  journey: IJourney;
  onClick?: () => void;
}

import { Card, Progress } from 'flowbite-react';

const JourneyCard: React.FC<Props> = ({ journey, onClick }) => {
  return (
    <div className={cn('col-span-1', onClick && 'cursor-pointer')}>
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
        onClick={onClick}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {journey.name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {journey.longDescription}
        </p>
        <Progress
          progress={journey.progress ?? 0}
          progressLabelPosition="inside"
          textLabel="Progresso"
          textLabelPosition="outside"
          size="lg"
          labelProgress
          labelText
        />
      </Card>
    </div>
  );
};

export default JourneyCard;
