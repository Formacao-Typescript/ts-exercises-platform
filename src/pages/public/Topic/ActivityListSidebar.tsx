import React, { useState } from 'react';

import { Sidebar } from 'flowbite-react';
import {
  RiMenuFoldLine as SidebarClosedIcon,
  RiMenuUnfoldLine as SidebarOpenedIcon,
} from 'react-icons/ri';

import {
  GoCheckCircle as UncheckedIcon,
  GoCheckCircleFill as CheckedIcon,
} from 'react-icons/go';

import { IActivity, IActivityIdentifier } from '@/types';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { updateActivityProgress, useUser } from '@/store/user';

interface Props {
  activityIdentifier: IActivityIdentifier;
  activities: IActivity[];
}
const ActivityListSidebar: React.FC<Props> = ({
  activityIdentifier,
  activities,
}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user] = useUser();

  const actions = {
    navigateToActivity: (activityId: string) => {
      console.log('navigateToActivity', activityId);
      // TODO: can add a warning if the user is currently on an activity and has unsaved changes
      navigate(`?activityId=${activityId}`);
    },
    toggleActivityCheck: (activityId: string) => {
      console.log('toggleActivityCheck', activityId);
      updateActivityProgress(activityIdentifier);
    },
  };
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      collapsed={collapsed}
      collapseBehavior="collapse"
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
                icon={isChecked ? CheckedIcon : UncheckedIcon}
                className={cn(
                  'cursor-pointer flex-row-reverse',
                  isChecked && 'text-green-500'
                )}
                active={isActive}
                onClick={() =>
                  isActive
                    ? actions.toggleActivityCheck(activity.id)
                    : actions.navigateToActivity(activity.id)
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
