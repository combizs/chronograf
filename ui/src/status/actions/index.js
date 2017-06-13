import {fetchJSONFeed as fetchJSONFeedAJAX} from 'src/status/apis'

import {errorThrown} from 'shared/actions/errors'

import * as actionTypes from 'src/status/constants/actionTypes'

const fetchJSONFeedRequested = () => ({
  type: actionTypes.FETCH_JSON_FEED_REQUESTED,
})

const fetchJSONFeedCompleted = data => ({
  type: actionTypes.FETCH_JSON_FEED_COMPLETED,
  payload: {data},
})

const fetchJSONFeedFailed = () => ({
  type: actionTypes.FETCH_JSON_FEED_FAILED,
})

export const fetchJSONFeedAsync = url => async dispatch => {
  dispatch(fetchJSONFeedRequested())
  try {
    const {data} = await fetchJSONFeedAJAX(url)
    dispatch(fetchJSONFeedCompleted(data))
  } catch (error) {
    console.error(error)
    dispatch(fetchJSONFeedFailed())
    dispatch(
      errorThrown(error, `Failed to fetch NewsFeed: ${error.data.message}`)
    )
  }
}