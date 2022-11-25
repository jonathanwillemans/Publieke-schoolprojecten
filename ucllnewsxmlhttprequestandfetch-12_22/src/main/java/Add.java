import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;

public class Add extends RequestHandler {
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        NewsItem newsItem = new NewsItem(request.getParameter("title"), request.getParameter("text"), LocalDate.now(),  request.getParameter("author"), null);
        newsRepository.add(newsItem);
        return "OK";
    }

}
