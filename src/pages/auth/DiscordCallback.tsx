import React from 'react';

import { useLocation } from 'react-router-dom';

const DiscordCallback: React.FC = () => {
  const { search } = useLocation();
  console.log(search);

  return (
    <div>
      <h1>callback maroto</h1>
      <pre>{search && JSON.stringify(search, null, 2)}</pre>
    </div>
  );
};

export default DiscordCallback;
