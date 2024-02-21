import React, { useState } from 'react';

import { Sidebar, SidebarItemProps } from 'flowbite-react';
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
  const [collapsed, setCollapsed] = useState(false);
  const [user] = useUser();

  const actions = {
    navigateToActivity: (activityId: string) => {
      console.log('navigateToActivity', activityId);
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
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      collapsed={collapsed}
      collapseBehavior="collapse"
      className={cn('transition-all duration-300 ease-in-out', className)}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <div
            className={cn(
              'flex items-center',
              collapsed ? 'justify-center' : 'justify-end'
            )}
          >
            <button
              type="button"
              className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <SidebarClosedIcon /> : <SidebarOpenedIcon />}
            </button>
          </div>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          {activities.map(activity => {
            const isChecked = user?.progress?.activities?.includes(activity.id);
            const isActive = activityIdentifier?.activityId === activity.id;
            return (
              <Sidebar.Item
                key={activity.id}
                className={cn(
                  'cursor-pointer relative',
                  isChecked && 'text-green-500'
                )}
                icon={({ className, ...props }: SidebarItemProps) => {
                  const Icon = UncheckedIcon;

                  return (
                    <Icon
                      {...props}
                      className={cn(
                        'absolute right-0 w-10 h-fit p-1.5 hover:bg-gray-600 cursor-pointer rounded-lg',
                        isChecked
                          ? 'text-green-400 hover:text-cyan-400'
                          : 'text-gray-500 hover:text-gray-300'
                      )}
                      onClick={(e: MouseEvent) =>
                        void e.stopPropagation() ??
                        actions.toggleActivityCheck(activity.id)
                      }
                    />
                  );
                }}
                active={isActive}
                onClick={() =>
                  !isActive && actions.navigateToActivity(activity.id)
                }
              >
                {activity.name}
              </Sidebar.Item>
            );
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default ActivityListSidebar;
