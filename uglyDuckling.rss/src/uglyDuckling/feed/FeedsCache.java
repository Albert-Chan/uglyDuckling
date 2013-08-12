package uglyDuckling.feed;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;

import uglyDuckling.db.SQLiteConnector;

import com.sun.syndication.feed.synd.SyndCategoryImpl;
import com.sun.syndication.feed.synd.SyndContentImpl;
import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndLinkImpl;

public class FeedsCache {

	private HashMap<String, FeedCache> cacheMap = new HashMap<String, FeedCache>();
	private FeedCache currentFeed;

	private static final String CONNECTION_STRING = "E:\\workspace\\uglyDuckling\\bbsEx\\bbsEx\\sqlite.db";

	private SQLiteConnector connector = null;

	public FeedsCache(List<String> feedSources) throws SQLException {
		initialize(feedSources);
		connector = new SQLiteConnector(CONNECTION_STRING);
	}

	private void initialize(List<String> feedSources) {
		for (String feed : feedSources) {
			String messageURI = getLatestFeedMessage(feed);
			FeedCache fc = new FeedCache();
			fc.latestOfLastRun = messageURI;
			cacheMap.put(feed, fc);
		}
	}

	private String getLatestFeedMessage(String feed) {
		// db query
		return null;
	}

	private class FeedCache {
		private String latestOfLastRun = null;
		private String latestOfCurrentRun = null;

		/**
		 * 
		 * @param uri
		 *            the URI of each Feed Message.
		 * @return false if the URI need not to be inserted; otherwise, true.
		 */
		boolean add(String uri) {
			if (uri != null && uri.equals(latestOfLastRun)) {
				return false;
			}
			if (latestOfCurrentRun == null) {
				latestOfCurrentRun = uri;
			}
			return true;
		}
	}

	public void startFeed(String feed) throws SQLException {
		if (cacheMap.containsKey(feed)) {
			currentFeed = cacheMap.get(feed);
		} else {
			currentFeed = new FeedCache();
			cacheMap.put(feed, currentFeed);
		}
		currentFeed.latestOfCurrentRun = null;
		connector.startTransaction();
	}

	public boolean addFeedMessage(SyndEntry message) throws SQLException {
		if (currentFeed.add(message.getUri())) {
			// call DB insert
			saveFeedEntry(message);
			return true;
		} else {
			return false;
		}
	}

	public void endFeed(String feed) throws SQLException {
		try {
			connector.commitTransaction();
			currentFeed.latestOfLastRun = currentFeed.latestOfCurrentRun;
		} catch (SQLException e) {
			connector.rollBack();
		}
	}

	@SuppressWarnings("unchecked")
	private void saveFeedEntry(SyndEntry entry) throws SQLException {
		System.out.println("Unique Identifier: " + entry.getUri());
		// Get the Links
		StringBuilder links = new StringBuilder();
		for (SyndLinkImpl link : (List<SyndLinkImpl>) entry.getLinks()) {
			links.append(link.getHref());
		}
		// Get the Contents
		StringBuilder contents = new StringBuilder();
		for (SyndContentImpl content : (List<SyndContentImpl>) entry
				.getContents()) {
			contents.append(content.getValue());
		}

		// Get the Categories
		StringBuilder catagories = new StringBuilder();
		for (SyndCategoryImpl category : (List<SyndCategoryImpl>) entry
				.getCategories()) {
			catagories.append(category.getName());
		}

		String sql = "INSERT INTO posts_Post(subject, keywords, content, author_id, time, topic_id, read_count, read_acl, write_acl, followed_count) "
				+ "values(?,?,?,1,?,1,0,1,1,0)";
		PreparedStatement addFeedMessage = connector.prepareStatement(sql);
		addFeedMessage.setString(1, entry.getTitle());
		addFeedMessage.setString(2, entry.getTitle());
		addFeedMessage.setString(3, contents.toString());
		//addFeedMessage.setString(4, entry.getAuthor());
		addFeedMessage.setTimestamp(4, new Timestamp(entry.getUpdatedDate()
				.getTime()));
		connector.update(addFeedMessage);
	}
}
