import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useLazyQuery, useQuery } from '@apollo/client';

import { Banner, BottomNavigation, Header, KaraokeCategories, SearchInput, SongList } from '../../components';
import Loader from '../../components/Loader/Loader';
import Footer from '../../layouts/footer';

import { useCallStore } from '../../contexts/call.store';

import { GET_BRANCH, GET_SONGS, GET_SONG_CATEGORIES, SEARCH_SONGS } from '../../graphql/query';
import { isValidToken } from '../../providers/auth';

import HideKeyboardOnScroll from '../../tools/hideKeyboardOnScroll';
import { debounce, isEmpty } from 'lodash';

const Index = () => {
  const { i18n } = useTranslation('language');
  const router = useRouter();
  const isValid = isValidToken();
  const { id } = router.query;
  const { setParticipant, participant } = useCallStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categories, loading: getCategoriesloading } = useQuery(GET_SONG_CATEGORIES, {
    onCompleted: (data) => {
      setSelectedCategoryId(data.getSongCategories[0]?.id || '');
    },
    skip: !id,
  });

  const [getSongs, { loading: getSongsLoading, data: songs }] = useLazyQuery(GET_SONGS);
  const [searchSongs, { loading: searchLoading, data: resultSongs }] = useLazyQuery(SEARCH_SONGS);

  const [getBranch, { loading, data }] = useLazyQuery(GET_BRANCH, {
    onCompleted(data) {
      setParticipant(data.getParticipant);
    },
    onError(err) {
      if (isValid) {
        router.push('/notfound');
      }
    },
  });

  useEffect(() => {
    if (selectedCategoryId) {
      getSongs({ variables: { category: selectedCategoryId } });
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (id) {
      getBranch({ variables: { id: id } });
    }
  }, [id]);

  if (loading || getCategoriesloading) return <Loader />;

  const onSearch = debounce((search) => {
    setSearchQuery(search);
    searchSongs({ variables: { category: selectedCategoryId, query: search } });
  }, 500);

  return (
    <>
      {data && participant && (
        // <Translator
        //   cacheProvider={cacheProvider}
        //   from="mn"
        //   to={Languages.find((item) => i18n.language.includes(item.name.toLowerCase())).name.toLowerCase()}
        //   googleApiKey={GOOGLE_CLOUD_KEY}
        // >
        <>
          <Header isBacked />
          <Banner branch={data.getParticipant.branch} />
          <KaraokeCategories
            categories={categories?.getSongCategories ?? []}
            setSelectedCategoryId={setSelectedCategoryId}
            selectedCategoryId={selectedCategoryId}
          />
          <SearchInput onSearch={onSearch} />
          <SongList
            loading={getSongsLoading || searchLoading}
            songs={isEmpty(searchQuery) ? songs?.getSongs : resultSongs?.searchSongs}
          />
          <Footer branch={data.getParticipant.branch} />
          <BottomNavigation />
          <HideKeyboardOnScroll />
        </>
      )}
    </>
  );
};

export default Index;
