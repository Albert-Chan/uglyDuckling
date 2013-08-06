package uglyDuckling.feed;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedList;

import uglyDuckling.db.UDDataBase;
import uglyDuckling.rss.Feed;
import uglyDuckling.rss.FeedMessage;

public class FeedsCache {

	private final static int MAX_CACHE_COUNT_PER_FEED = 100;
	private HashMap<String, FeedCache> cacheMap = new HashMap<String, FeedCache>();
	private FeedCache currentFeed;
	private String serializedUri=null;//last run uri ,have been serialized;
	private String toSerializingUri=null;//new uri ,if the feeds updated ,have not been serialized;
	UDDataBase db;
	{
		//initial db;
	}

	private class FeedCache {
		LinkedList<FeedMessage> list = new LinkedList<FeedMessage>();
		//private String latestOfLastRun = null;
		//private String latestOfCurrentRun = null;
		private int insertPositionOfCurrentRun = 0;

		/**
		 * 
		 * @param uri
		 * @return false if the URI need not to be inserted; otherwise, true.
		 */
		boolean add(FeedMessage message) {
			String uri=message.getLink();
					
			if (uri!=null&& uri.equals(serializedUri)) {
				return false;
			}
			if (insertPositionOfCurrentRun == 0) {
				toSerializingUri=uri;
			}
			list.add(insertPositionOfCurrentRun++, message);
			return true;
		}
	}

	public void startFeed(Feed feed) {
			db.startTransaction();
		if (cacheMap.containsKey(feed)) {
			currentFeed = cacheMap.get(feed);
			if (!currentFeed.list.isEmpty()) {
			  if(serializedUri==null)
				 serializedUri=deserializeURlFromFile();
			}
		} else {
			currentFeed = new FeedCache();
			cacheMap.put(feed.getLink(), currentFeed);
		}
        db.addFeed(feed);		
	}

	

	public void add(FeedMessage message) throws SQLException {
		if (currentFeed.add(message)) {
			db.addFeedMessage(message);
		} else {
			endFeed();
		}
	}

	public void endFeed() {
		
		serializedURLToFile(toSerializingUri);
		serializedUri=toSerializingUri;
		if(db.commit())
	        db.endTransaction();
		else
			db.rollBack();
	}

	private void serializedURLToFile(String toSerializingUri2) {
		// TODO Auto-generated method stub
		
	}
	
	private String deserializeURlFromFile() {
		// TODO Auto-generated method stub
		return null;
	}
}
