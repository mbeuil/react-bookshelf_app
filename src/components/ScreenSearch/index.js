import '@reach/tooltip/styles.css';

import {useState, useEffect} from 'react';
import Tooltip from '@reach/tooltip';
import {FaSearch, FaTimes} from 'react-icons/fa';
import {client} from 'utils/api-client';
import {useAsync, fetchMovie} from 'custom-hooks/useAsync';

import * as G from 'styles/common-styles';
import * as C from 'styles/colors';
import * as S from './styles';

function ScreenSearch() {
  const {status, data, error} = useAsync();
  const [query, setQuery] = useState('');
  const [isQueried, setIsQueried] = useState(false);
  console.log(status, data, error);

  useEffect(() => {
    if (!isQueried) {
      return;
    }
    fetchMovie(client(`${encodeURIComponent(query)}`));
  }, [isQueried, query]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
    setIsQueried(true);
  }

  return (
    <div
      style={{
        maxWidth: 800,
        width: '90vw',
        padding: '40px 0',
      }}
    >
      <form onSubmit={handleSearchSubmit}>
        <G.Input
          placeholder="Search Screens..."
          id="search"
          style={{width: '100%'}}
        />
        <Tooltip label="Search Screens">
          <label htmlFor="search">
            <button
              type="submit"
              style={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {status === 'pending' ? (
                <G.LoadingSpinner />
              ) : status === 'rejected' ? (
                <FaTimes aria-label="error" style={{color: C.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>
      <div
        style={{
          maxWidth: 800,
          width: '90vw',
          minHeight: '400px',
          background: C.gray,
          marginTop: 20,
        }}
      >
        {status === 'rejected' ? (
          <div style={{color: C.danger}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}

        {status === 'resolved' ? (
          data?.length ? (
            <S.ScreenListUL>
              {data.map(item => (
                <li key={item.show.id}>
                  <div style={{height: '30px', border: '1px solid gray'}}>
                    {item.show.name}
                  </div>
                </li>
              ))}
            </S.ScreenListUL>
          ) : (
            <p>No movies or series found. Try another search.</p>
          )
        ) : null}
      </div>
    </div>
  );
}

export default ScreenSearch;
