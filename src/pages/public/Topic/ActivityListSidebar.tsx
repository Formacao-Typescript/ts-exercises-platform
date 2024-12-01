import React, { useState } from 'react';

import { Progress, Sidebar, SidebarItemProps } from 'flowbite-react';
import {
  RiMenuFoldLine as SidebarClosedIcon,
  RiMenuUnfoldLine as SidebarOpenedIcon,
} from 'react-icons/ri';

import {
  GoCheckCircle as UncheckedIcon,
  // GoCheckCircleFill as CheckedIcon,
} from 'react-icons/go';

import { IActivity, IActivityIdentifier } from '@/types';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { updateActivityProgress, useUser } from '@/store/user';
import styled from 'styled-components';

interface Props {
  activityIdentifier: IActivityIdentifier;
  activities: IActivity[];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

const ActivityListSidebar: React.FC<Props> = ({
  activityIdentifier,
  activities,
  className,
}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [user] = useUser();

  const actions = {
    navigateToActivity: (activityId: string) => {
      // TODO: can add a warning if the user is currently on an activity and has unsaved changes
      navigate(`?activityId=${activityId}`);
      /* 
      Dev note: since Github Pages doesn't support browser history we have to use HashRouter instead of BrowserRouter.
      Unfortunately, with HashRouter, useNavigate only changes the url but it's not able to navigate to the new url.
      So we have to force refresh with navigate(0) after changing the url.
      */
      navigate(0);
    },
    toggleActivityCheck: (activityId: string) => {
      const { journeyId, topicId } = activityIdentifier;
      updateActivityProgress({
        journeyId,
        topicId,
        activityId,
      });
    },
  };

  //   <button
  //               type="button"
  //               className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
  //               onClick={() => setCollapsed(!collapsed)}
  //             >
  //               {collapsed ? <SidebarClosedIcon /> : <SidebarOpenedIcon />}
  //             </button>

  // {activities.map(activity => {
  //   const isChecked = user?.progress?.activities?.includes(activity.id);
  //   const isActive = activityIdentifier?.activityId === activity.id;
  //   return (
  //     <Sidebar.Item
  //       key={activity.id}
  //       className={cn(
  //         'cursor-pointer relative h-10 flex flex-row-reverse p-0',
  //         isChecked && 'text-green-500'
  //       )}
  //       icon={(props: SidebarItemProps) => {
  //         return (
  //           <div {...props} className="relative w-10 h-10">
  //             <UncheckedIcon
  //               className={cn(
  //                 'absolute right-0 w-10 h-fit p-1.5 hover:bg-gray-600 cursor-pointer rounded-lg',
  //                 isChecked
  //                   ? 'text-green-400 hover:text-cyan-400'
  //                   : 'text-gray-500 hover:text-gray-300'
  //               )}
  //               onClick={(e: MouseEvent) => {
  //                 e.stopPropagation();
  //                 actions.toggleActivityCheck(activity.id);
  //               }}
  //             />
  //           </div>
  //         );
  //       }}
  //       active={isActive}
  //       onClick={() =>
  //         !isActive && actions.navigateToActivity(activity.id)
  //       }
  //     >
  //       {activity.name}
  //     </Sidebar.Item>
  //   );
  // })}

  console.log(activities);
  return (
    <Container $collapsed={collapsed}>
      <header>
        <h1>Nome do tópico</h1>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <SidebarOpenedIcon />
        </button>
      </header>
      <section className="content">
        <div className="topic-progress">
          <h2>Progresso do tópico</h2>
          <p>
            <span>1</span> / <span>10</span> atividades completas
          </p>
          <Progress value={10} />
        </div>

        <ol className="activity-list">
          {activities.map((activity, index) => {
            const isChecked = user?.progress?.activities?.includes(activity.id);
            const isActive = activityIdentifier?.activityId === activity.id;

            console.log({ activity, isChecked, isActive, activityIdentifier });
            return (
              <li
                key={activity.id}
                className={cn('activity-list-item', isActive && 'active')}
                onClick={() => {
                  !isActive && actions.navigateToActivity(activity.id);
                }}
              >
                <h3 title={activity.name}>
                  <span className="marker">
                    {(index + 1).toString().padStart(2, '0')}.
                  </span>
                  {activity.name}
                </h3>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    actions.toggleActivityCheck(activity.id);
                  }}
                >
                  <UncheckedIcon
                    className={
                      isChecked
                        ? 'text-green-400 hover:text-cyan-400'
                        : 'text-gray-500 hover:text-gray-300'
                    }
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </Container>
  );
};

const Container = styled.div<{ $collapsed: boolean }>`
  --sidebar-width: 400px;
  --header-height: 70px;
  width: var(--sidebar-width);
  height: calc(100% - var(--header-height));
  background: var(--bg-black);
  position: fixed;
  top: var(--header-height);
  right: 0;
  z-index: 1000;
  box-shadow: -15px 16px 20px 0px rgba(0, 0, 0, 0.5);

  header {
    height: var(--header-height);
    background: var(--bg-mid-black);
    border-bottom: 1px solid white;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    button svg {
      transition: transform 0.3s ease-in-out;
      transform: ${({ collapsed }) => (collapsed ? 'rotate(180deg)' : 'none')};
    }
  }

  .content {
    padding: 20px;

    .topic-progress {
      margin-bottom: 20px;
    }

    .activity-list {
      list-style: decimal-leading-zero;
      padding: 0;
      margin: 0;
      counter-reset: activity-counter;

      &-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        color: white;
        font-size: 1.2rem;
        background: #212033;
        margin-bottom: 10px;
        border-radius: 12px;
        padding: 0 20px;

        <<<<<<< Updated upstream ======= h3 {
          max-width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        >>>>>>>Stashed changes .marker {
          opacity: 0.8;
          font-size: 0.9rem;
          margin-right: 10px;
        }

        button {
          font-size: 1.6rem;
        }

        &.active {
          background: #374151;
        }
      }
    }
  }
`;

export default ActivityListSidebar;
