import { useSearchParams } from '@/hooks';
import { useUser } from '@/store/user';
import { fetchUser as fetchDiscordUser } from '@/utils/discord';

import { buildUrl } from '@/utils/url';
import _ from 'lodash';
import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useSearchParams('platform', 'error', 'code');
  const [user, , updateUser] = useUser();

  const informError = (error: string) => {
    const url = buildUrl('/auth', {
      error,
      platform: searchParams.platform,
    });

    navigate(url);
  };

  useEffect(() => {
    if (!searchParams.platform) return void 0;
    console.log('searchParams', searchParams);

    // TODO: refactor this to handlers['platform'].something
    if (searchParams.platform === 'discord') {
      if (searchParams.error) {
        informError(searchParams.error); // access_denied
        return void 0;
      }

      if (searchParams.code) {
        try {
          (async () => {
            const { user: discordUser, token } = await fetchDiscordUser(
              searchParams.code
            );

            // TODO: check if user already exists (discordUser.id === remote_user.discord_id)

            const remoteUser = null;

            if (!remoteUser) {
              updateUser(_user => ({
                ..._user,
                id: _.uniqueId('user_'),
                email: discordUser.email,
                username: discordUser.username,
                global_name: discordUser.global_name,
                avatar: { kind: 'discord', value: discordUser.avatar },
                discord_id: discordUser.id,
                token: token,
              }));

              // TODO: save user to remote, including offline user progress
              console.log('new user!', discordUser);
            }

            updateUser(_user => ({
              ..._user, // TODO: properly merge local and remote user progress
              remoteUser, // FIXME: this will override local user progress on login
            }));

            console.log('existing user!', discordUser);
            navigate('/');
          })();
        } catch (error) {
          informError('unexpected_error'); // token request failed
        }
      }
    }
  }, [searchParams]);

  return (
    <div>
      <h1>callback maroto</h1>
      <pre>{search && JSON.stringify(search, null, 2)}</pre>
    </div>
  );
};

export default Callback;
