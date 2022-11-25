import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public abstract class RequestHandler {
    protected NewsRepository newsRepository;

    public abstract String handleRequest (HttpServletRequest request, HttpServletResponse response);

    public NewsRepository getService() {
        return newsRepository;
    }

    public void setService(NewsRepository service) {
        this.newsRepository = service;
    }
}
