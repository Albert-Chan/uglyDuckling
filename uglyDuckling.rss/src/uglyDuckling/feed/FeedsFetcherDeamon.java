package uglyDuckling.feed;

import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.sun.syndication.feed.synd.SyndEntry;
import com.sun.syndication.feed.synd.SyndFeed;
import com.sun.syndication.io.SyndFeedInput;
import com.sun.syndication.io.XmlReader;

public class FeedsFetcherDeamon {
	private static final int SLEEP_PERIOD = 20000;//1000 * 5 * 60;

	public static void main(String[] args) throws Exception {
		// get feed URLs from configuration file.
		List<String> feedSources = FeedsRepositoryReader.getFeedSources();
		FeedsCache cache = new FeedsCache(feedSources);

		while (true) {
			for (String feed : feedSources) {
				URL feedUrl = new URL(feed);
				cache.startFeed(feed);
				List<SyndEntry> entries = fetch(feedUrl);
				for (SyndEntry entry : entries) {
					if (!cache.addFeedMessage(entry))
						break;
				}
				cache.endFeed(feed);
			}
			TimeUnit.MILLISECONDS.sleep(SLEEP_PERIOD);
		}
	}

	@SuppressWarnings("unchecked")
	public static List<SyndEntry> fetch(URL feedUrl) {
		try {
			SyndFeedInput input = new SyndFeedInput();
			SyndFeed feed = input.build(new XmlReader(feedUrl));
			return feed.getEntries();
		} catch (Exception ex) {
			System.out.println("Error: " + ex.getMessage());
			return Collections.EMPTY_LIST;
		}
	}
}
