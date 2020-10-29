import {useRef, useLayoutEffect, useCallback, useReducer} from 'react';

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      return {...state, status: 'pending'};
    }
    case 'SUCCESS': {
      return {...state, status: 'resolved', data: action.promiseData};
    }
    case 'ERROR': {
      return {...state, status: 'rejected', error: action.promiseError};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

function useSafeDispatch(dispatch) {
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch],
  );
}

function useAsync() {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  return [state, dispatch];
}

async function fetchMovie(promise, dispatch) {
  if (!promise || !promise.then) {
    throw new Error(
      `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
    );
  }
  dispatch({type: 'START'});
  try {
    const data = await promise;
    dispatch({type: 'SUCCESS', data});
    return data;
  } catch (error) {
    dispatch({type: 'ERROR', error});
    return Promise.reject(error);
  }
}

export {useAsync, fetchMovie};
