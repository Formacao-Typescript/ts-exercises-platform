import LoadingIndicator from '@/components/LoadingIndicator';
import { useSearchParams } from '@/hooks';
import { useUser } from '@/store/user';
import { SupportedPlatforms } from '@/types';
import { fetchUser as fetchDiscordUser } from '@/utils/discord';

import { buildUrl } from '@/utils/url';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams('platform', 'error', 'code');
  const [, setUser] = useUser();

  const handlers: Record<SupportedPlatforms, () => Promise<void>> =
    useMemo(() => {
      const informError = (platform: SupportedPlatforms, error: string) => {
        const url = buildUrl('/auth', {
          platform,
          error,
        });

        navigate(url);
      };
      return {
        discord: async () => {
          if (searchParams.error) {
            informError('discord', searchParams.error); // access_denied
            return void 0;
          }

          if (searchParams.code) {
            try {
              const { user: discordUser, token } = await fetchDiscordUser(
                searchParams.code
              );

              // TODO: fetch remote user based on discordUser.id
              // TODO: check if user already exists (discordUser.id === remote_user.discord_id)
              const remoteUser = undefined;

              if (!remoteUser) {
                setUser(_user => ({
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
                toast.success('Bem-vindo(a) a bordo!');
                // navigate('/');
                return void 0;
              }

              setUser(_user => ({
                ..._user, // TODO: properly merge local and remote user progress
                remoteUser, // FIXME: this will override local user progress on login
              }));

              toast.success(
                _.sample([
                  'Bem-vindo(a) de volta! 👋',
                  'Olha só quem voltou 👋👋',
                  'Salve salve! 👋👋👋',
                ])
              );
              // navigate('/');
            } catch (error) {
              informError('discord', 'unexpected_error'); // token request failed
            }
          }
        },
      };
    }, [searchParams, setUser, navigate]);

  useEffect(() => {
    if (!searchParams.platform) return void 0;
    console.info('searchParams', searchParams);

    const handler = handlers[searchParams.platform as SupportedPlatforms];
    if (!handler) {
      // unsupported platform. No need to throw user-friendly errors here since this page should be developer-use only.
      return void 0;
    }
    void handler().then(() => {
      const { protocol, host, pathname } = window.location;
      const newUrl = `${protocol}//${host}${pathname}`;
      // Developer Note: this removes the unnused query params from URL without triggering a page reload
      window.history.replaceState({}, document.title, newUrl);
      navigate('/');
    });
  }, [searchParams, handlers, navigate]);

  return (
    <div>
      <LoadingIndicator />
    </div>
  );
};

export default Callback;
