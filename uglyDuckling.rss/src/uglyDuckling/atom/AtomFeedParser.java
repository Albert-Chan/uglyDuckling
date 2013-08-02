package uglyDuckling.atom;

import java.net.URL;
import java.util.List;

import com.sun.syndication.feed.synd.SyndCategoryImpl;
import com.sun.syndication.feed.synd.SyndContentImpl;
import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.feed.synd.SyndLinkImpl;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;

public class AtomFeedParser {

	public static void main(String[] args) {
		try {
			URL feedUrl = new URL("http://www.guokr.com/rss/");
			//URL feedUrl = new URL("http://rss.sina.com.cn/news/society/focus15.xml");
			
			SyndFeedInput input = new SyndFeedInput();
			SyndFeed feed = input.build(new XmlReader(feedUrl));//.build(new XmlReader(feedUrl));
			System.out.println("Feed Title: " + feed.getTitle());
			// Get the entry items...
			for (SyndEntry entry : (List<SyndEntry>) feed.getEntries()) {
				System.out.println("Title: " + entry.getTitle());
				System.out.println("Unique Identifier: " + entry.getUri());
				System.out.println("Updated Date: " + entry.getUpdatedDate());
				// Get the Links
				for (SyndLinkImpl link : (List<SyndLinkImpl>) entry.getLinks()) {
					System.out.println("Link: " + link.getHref());
				}
				// Get the Contents
				for (SyndContentImpl content : (List<SyndContentImpl>) entry
						.getContents()) {
					System.out.println("Content: " + content.getValue());
				}

				// Get the Categories
				for (SyndCategoryImpl category : (List<SyndCategoryImpl>) entry
						.getCategories()) {
					System.out.println("Category: " + category.getName());
				}
			}
		} catch (Exception ex) {
			System.out.println("Error: " + ex.getMessage());
		}
	}
}