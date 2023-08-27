import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { I18nextProvider } from 'react-i18next';

import Head from 'next/head';
import client from '../providers/client';
import i18next from 'i18next';
import { LANG_RESOURCES } from '../constants/constantLang';
import { AuthProvider, getPayload } from '../providers/auth';
import { isEmpty } from 'lodash';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { LoyaltyProvider } from '../contexts/loyalty.context';
import SubscriptionProvider from '../providers/subscription';
import { NotificationProvider } from '../providers/notification';

const payload = getPayload();

const initialLanguage = () => {
  return isEmpty(payload?.languages) || payload?.languages[0] === '' || !payload?.languages[0]
    ? 'mn'
    : payload?.languages[0];
};

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: initialLanguage(), // language to use
  resources: LANG_RESOURCES,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Q-Menu</title>
      </Head>
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}>
          <NotificationProvider>
            <AuthProvider>
              <ThemeProvider attribute="class">
                <SubscriptionProvider>
                  <LoyaltyProvider>
                    <Component {...pageProps} />
                  </LoyaltyProvider>
                </SubscriptionProvider>
              </ThemeProvider>
            </AuthProvider>
          </NotificationProvider>
        </I18nextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
