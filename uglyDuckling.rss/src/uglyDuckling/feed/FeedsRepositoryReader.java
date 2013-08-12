package uglyDuckling.feed;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class FeedsRepositoryReader {
	private static final String REPOSITORY_FILE_NAME = "feedsRepository.txt";

	public static ArrayList<String> getFeedSources() throws IOException {
		ArrayList<String> feedSources = new ArrayList<String>();
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(
					new FileInputStream(REPOSITORY_FILE_NAME), "utf-8"));
			String line;
			while (null != (line = reader.readLine())) {
				line = line.trim();
				// ignore empty line
				if (line.isEmpty())
					continue;
				// ignore commented out line
				if (line.indexOf("//") == 0) {
					continue;
				}
				feedSources.add(line);
			}
			return feedSources;
		} finally {
			if (reader != null) {
				reader.close();
			}
		}
	}

}
