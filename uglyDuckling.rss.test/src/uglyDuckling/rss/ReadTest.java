package uglyDuckling.rss;

import uglyDuckling.rss.Feed;
import uglyDuckling.rss.FeedMessage;
import uglyDuckling.rss.RSSFeedParser;

public class ReadTest {
	public static void main(String[] args) {
		RSSFeedParser parser = new RSSFeedParser(
				"http://rss.sina.com.cn/news/society/focus15.xml");
		Feed feed = parser.readFeed();
		System.out.println(feed);
		for (FeedMessage message : feed.getMessages()) {
			System.out.println(message);
		}

	}
}