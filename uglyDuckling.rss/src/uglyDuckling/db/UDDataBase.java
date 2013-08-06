package uglyDuckling.db;

import java.util.List;

import uglyDuckling.rss.Feed;
import uglyDuckling.rss.FeedMessage;

public interface UDDataBase {

	void addFeed(Feed feed);
	Feed getFeed(int id);
	void deleteFeed(int id);
	List<Feed> getAllFeed();
	void addFeedMessage(FeedMessage message);
	FeedMessage getFeedMessage(int id);
	void deleteFeedMessage(int id);
	List<Feed> getAllFeedMessage();
	void startTransaction() ;
	void endTransaction() ;
	boolean commit() ;
	void rollBack();
}
