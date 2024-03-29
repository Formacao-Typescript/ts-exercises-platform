import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { HiChevronRight as ChevronRightIcon, HiHome } from 'react-icons/hi';

import cn from 'classnames';
import _ from 'lodash';
import { usePageTransitionBubble } from '@/store/navigation';

interface Props {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

interface IRouteItem {
  path: string;
  title: string;
}

const Breadcrumb: React.FC<Props> = ({ className }) => {
  const [, setBubbleState] = usePageTransitionBubble();
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [routes, setRoutes] = useState<IRouteItem[]>([]);
  const searchParams = useParams();

  useEffect(() => {
    if (_.isEmpty(searchParams)) {
      setRoutes([]);
      return void 0;
    }

    const _routes = [];
    if (searchParams.journeyId) {
      _routes.push({
        path: `/journey/${searchParams.journeyId}`,
        title: 'Temas',
      });
    }
    if (searchParams.topicId) {
      _routes.push({
        path: `/journey/${searchParams.journeyId}/topic/${searchParams.topicId}`,
        title: 'Atividade',
      });
    }

    setRoutes(_routes);
  }, [searchParams]);

  const actions = {
    linkClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      if (isFirstClick) {
        e.preventDefault();
        setIsFirstClick(false);
        // TODO: add blue color to bubble
        setBubbleState({ open: true, position: [e.clientX, e.clientY] });
        setTimeout(() => {
          e.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          setIsFirstClick(true);
        }, 1000);
      }
    },
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('flex', className)}>
      <ol className="inline-flex items-center">
        <Link
          to="/"
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          onClick={e => actions.linkClick(e)}
        >
          <HiHome className="mr-2 h-4 w-4" />
          Jornadas
        </Link>
        {routes.map(({ title, path }) => (
          <Link
            key={'route-' + title}
            to={path}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={e => actions.linkClick(e)}
          >
            <ChevronRightIcon className="mx-1 h-5 w-5 text-gray-400 group-first:hidden md:mx-2" />
            {title}
          </Link>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
