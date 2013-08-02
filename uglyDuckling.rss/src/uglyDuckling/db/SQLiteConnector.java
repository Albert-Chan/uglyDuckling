package uglyDuckling.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SQLiteConnector {
	public static void main(String[] args) throws SQLException {
		SQLiteConnector conn = null;
		try {
			conn = new SQLiteConnector(
					"D:\\git\\uglyDuckling\\bbsEx\\bbsEx\\sqlite.db");
			conn.query("SELECT name FROM posts_Topic",
					conn.new ResultSetHandler());
		} finally {
			conn.close();
		}
	}

	private Statement stat = null;
	private Connection conn = null;

	static {
		try {
			Class.forName("org.sqlite.JDBC");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public SQLiteConnector(String db) throws SQLException {
		conn = DriverManager.getConnection("jdbc:sqlite:" + db);
		stat = conn.createStatement();
	}

	/**
	 * Create table, insert, update, etc...
	 * 
	 * @param sql
	 */
	public void update(String sql) throws SQLException {

		// stat.executeUpdate(
		// "create table tbl1(name varchar(20), col_int int);" );
		// stat.executeUpdate( "insert into tbl1 values('aaa',8888);" );
		stat.executeUpdate(sql);
	}

	/**
	 * Select ...
	 * 
	 * @param sql
	 */
	public void query(String sql, ResultSetHandler handler) throws SQLException {
		ResultSet rs = null;
		try {
			stat.executeQuery(sql);
			handler.handle(rs);
		} finally {
			if (rs != null) {
				rs.close();
			}
		}
	}

	public void close() throws SQLException {
		if (conn != null)
			conn.close();
	}

	class ResultSetHandler {
		public void handle(ResultSet rs) throws SQLException {
			while (rs.next()) {
				System.out.println("name = " + rs.getString("name"));
			}
		}
	}

}
