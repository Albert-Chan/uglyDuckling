package uglyDuckling.feed;

import java.net.URL;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import uglyDuckling.db.SQLiteConnector;

import com.sun.syndication.feed.synd.SyndCategoryImpl;
import com.sun.syndication.feed.synd.SyndContentImpl;
import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.feed.synd.SyndLinkImpl;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;

public class FeedFetcher {

	private SQLiteConnector connector = null;
	
	private static final SimpleDateFormat DATE_FORMAT_YMDHMS = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:SS");

	public static void main(String[] args) throws Exception {
		URL u1 = new URL("http://www.guokr.com/rss/");
//		 URL u1 = new URL(
//		 "http://cnbeta.feedsportal.com/c/34306/f/624776/index.rss");

		// get feed URLs from config file.
		List<URL> feedUrls = new ArrayList<URL>();
		feedUrls.add(u1);
		FeedFetcher fetcher = new FeedFetcher();
		try {
			fetcher.connector = new SQLiteConnector(
					"E:\\workspace\\uglyDuckling\\bbsEx\\bbsEx\\sqlite.db");
			for (URL feedUrl : feedUrls) {
				List<SyndEntry> entries = fetcher.fetch(feedUrl);
				for (SyndEntry entry : entries) {
					fetcher.saveFeedEntry(entry);
				}
			}
		} finally {
			if (fetcher.connector != null)
				fetcher.connector.close();
		}
	}

	private List<SyndEntry> fetch(URL feedUrl) {
		try {
			SyndFeedInput input = new SyndFeedInput();
			SyndFeed feed = input.build(new XmlReader(feedUrl));

			return feed.getEntries();

		} catch (Exception ex) {
			System.out.println("Error: " + ex.getMessage());
			return Collections.EMPTY_LIST;
		}
	}

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

		String sql = "INSERT INTO posts_Post(subject, keywords, content, author_id, time, topic_id, read_count, read_acl, write_acl, followed_count) values("
				+ "'" + entry.getTitle().replace("'", "''")
				+ "',"
				+ "'" + entry.getTitle().replace("'", "''")
				+ "',"
				+ "'" + contents.toString().replace("'", "''")
				+ "',"
				+1 +","
//				+ "'" + entry.getAuthor()
//				+ "',"
				+ "'" + DATE_FORMAT_YMDHMS.format(entry.getUpdatedDate())
				+ "'," +1 +","+0 +","+1 +","+1 +","+0 
				+ ")";

		connector.update(sql);	
	}
}