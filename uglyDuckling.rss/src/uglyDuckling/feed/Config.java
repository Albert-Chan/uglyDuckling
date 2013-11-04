package uglyDuckling.feed;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Config {
	private static final String CONFIG_FILE = "config.ini";
	private static Properties config = new Properties();

	public static final String DB_CONNECTION = "db_connection";

	static {
		try (InputStream in = new FileInputStream(CONFIG_FILE)) {
			config.load(in);
		} catch (IOException e) {
		}
	}

	public static String get(String key) {
		return config.getProperty(key);
	}
}