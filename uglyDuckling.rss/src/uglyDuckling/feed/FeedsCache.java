package uglyDuckling.feed;

import java.util.HashMap;
import java.util.LinkedList;

public class FeedsCache {

	private final static int MAX_CACHE_COUNT_PER_FEED = 100;
	private HashMap<String, FeedCache> cacheMap = new HashMap<String, FeedCache>();
	private FeedCache currentFeed;

	private class FeedCache {
		LinkedList<String> list = new LinkedList<String>();
		private String latestOfLastRun = null;
		private String latestOfCurrentRun = null;
		private int insertPositionOfCurrentRun = 0;

		/**
		 * 
		 * @param uri
		 * @return false if the URI need not to be inserted; otherwise, true.
		 */
		boolean add(String uri) {
			if (uri.equals(latestOfLastRun)) {
				return false;
			}
			if (insertPositionOfCurrentRun == 0) {
				latestOfCurrentRun = uri;
				//serialize latestOfCurrentRun
			}
			list.add(insertPositionOfCurrentRun++, uri);
			return true;
		}
	}

	public void startFeed(String feed) {
		if (cacheMap.containsKey(feed)) {
			currentFeed = cacheMap.get(feed);
			if (!currentFeed.list.isEmpty()) {
				currentFeed.latestOfLastRun = currentFeed.list.getFirst();
				currentFeed.insertPositionOfCurrentRun = 0;
			}
		} else {
			currentFeed = new FeedCache();
			cacheMap.put(feed, currentFeed);
		}
	}

	public void add(String uri) {
		if (currentFeed.add(uri)) {
			// call db insert

			// serialize current uri
		} else {
			endFeed();
		}
	}

	public void endFeed() {
		currentFeed.latestOfLastRun = currentFeed.list.getFirst();
		// serialize latestOfLastRun
		// delete serialized currentURI and latestOfCurrentRun
	}
}
