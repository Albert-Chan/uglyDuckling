package CopybookServer;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

public enum TodoDao {
	instance;

	private Map<String, Todo> contentProvider = new HashMap<String, Todo>();
	private volatile AtomicLong counter = new AtomicLong(0);

	private TodoDao() {

		Todo todo = new Todo("learn angular");
		todo.setDescription("Set descriptions");
		todo.setDone(true);
		add(todo);
		todo = new Todo("build an angular app");
		todo.setDescription("Read complete http://angularjs.org/");
		add(todo);

	}

	public Map<String, Todo> getModel() {
		return contentProvider;
	}

	public void add(Todo todo) {
		long index = counter.incrementAndGet();
		contentProvider.put(Long.toString(index), todo);
	}

	public void remove(Todo todo) {
		contentProvider.remove(todo.getId());
	}

}