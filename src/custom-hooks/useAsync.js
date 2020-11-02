import {useRef, useLayoutEffect, useCallback, useReducer} from 'react';

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      return {...state, status: 'pending'};
    }
    case 'SUCCESS': {
      return {...state, status: 'resolved', data: action.data};
    }
    case 'ERROR': {
      return {...state, status: 'rejected', error: action.error};
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
  console.log('here', state);
  const run = useCallback(
    promise => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        );
      }
      dispatch({type: 'START'});
      return promise
        .then(data => {
          dispatch({type: 'SUCCESS', data});
          return data;
        })
        .catch(error => {
          dispatch({type: 'ERROR', error});
          return Promise.reject(error);
        });
    },
    [dispatch],
  );

  return {...state, run};
}

export default useAsync;
