package CopybookServer;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

public enum TodoDao {
	instance;

	private Map<String, Todo> contentProvider = new HashMap<String, Todo>();
	private volatile AtomicLong counter = new AtomicLong(0);

	private TodoDao() {

	}

	public Map<String, Todo> getModel() {
		return contentProvider;
	}
	
	public Collection<Todo> list() throws OperationException {
		return contentProvider.values();
	}

	public void add(Todo todo) throws OperationException {
		long index = counter.incrementAndGet();
		contentProvider.put(Long.toString(index), todo);
	}

	public void remove(Todo todo) throws OperationException {
		contentProvider.remove(todo.getId());
	}

}