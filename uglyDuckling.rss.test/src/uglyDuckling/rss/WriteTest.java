package uglyDuckling.rss;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

import uglyDuckling.rss.Feed;
import uglyDuckling.rss.FeedMessage;
import uglyDuckling.rss.RSSFeedWriter;

public class WriteTest {

	public static void main(String[] args) {
		// Create the rss feed
		String copyright = "Copyright ugly duckling 2013";
		String title = "title";
		String description = "description";
		String language = "en";
		String link = "http://uglyduckling.com";
		Calendar cal = new GregorianCalendar();
		Date creationDate = cal.getTime();
		SimpleDateFormat date_format = new SimpleDateFormat(
				"EEE', 'dd' 'MMM' 'yyyy' 'HH:mm:ss' 'Z", Locale.US);
		String pubdate = date_format.format(creationDate);
		Feed rssFeeder = new Feed(title, link, description, language,
				copyright, pubdate);

		// Now add one example entry
		FeedMessage feed = new FeedMessage();
		feed.setTitle("testMessage");
		feed.setDescription("message description");
		feed.setAuthor("ugly duckling");
		feed.setGuid("? create guid ?");
		feed.setLink("http://uglyduckling.com/RSSFeed/popular.html");
		rssFeeder.getMessages().add(feed);

		// Now write the file
		RSSFeedWriter writer = new RSSFeedWriter(rssFeeder, "popular.rss");
		try {
			writer.write();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}