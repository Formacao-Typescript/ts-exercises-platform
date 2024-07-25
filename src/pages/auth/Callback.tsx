import LoadingIndicator from '@/components/LoadingIndicator';
import { useSearchParams } from '@/hooks';
import { mergeLocalAndRemoteUser, useUser } from '@/store/user';
import { IRemoteUser, SupportedPlatforms } from '@/types';
import { fetchUser } from '@/services/discord';

import { buildUrl } from '@/utils/url';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams('platform', 'error', 'code');
  const [user, setUser] = useUser();

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
              const remoteUser = await fetchUser(searchParams.code);

              setUser(mergeLocalAndRemoteUser(user, remoteUser as IRemoteUser));

              toast.success(
                _.sample([
                  'Bem-vindo(a) de volta! 👋',
                  'Olha só quem voltou 👋👋',
                  'Salve salve! 👋👋👋',
                ])
              );
            } catch (error) {
              informError('discord', 'unexpected_error'); // token request failed
            }
          }
        },
      };
    }, [searchParams, setUser, navigate, user]);

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
