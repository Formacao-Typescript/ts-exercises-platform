import React from 'react';

import { Sidebar } from 'flowbite-react';
import { HiChartPie } from 'react-icons/hi';
import { IActivity } from '@/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  activities: IActivity[];
}
const ActivityListSidebar: React.FC<Props> = ({ activities }) => {
  const navigate = useNavigate();

  const actions = {
    activityItemClick: (activityId: string) => {
      // TODO: can add a warning if the user is currently on an activity and has unsaved changes
      navigate(`?activityId=${activityId}`);
    },
  };
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {activities.map(activity => (
            <Sidebar.Item
              key={activity.id}
              icon={HiChartPie}
              className="cursor-pointer"
              onClick={() => actions.activityItemClick(activity.id)}
            >
              {activity.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default ActivityListSidebar;
