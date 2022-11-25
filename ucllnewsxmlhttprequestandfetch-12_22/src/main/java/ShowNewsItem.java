import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class ShowNewsItem extends RequestHandler{
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        NewsItem newsItem = newsRepository.getItemWithTitle(request.getParameter("Titel"));
        return newsItemToJSON(newsItem);
    }


    private String newsItemToJSON(NewsItem newsItem) {
        ObjectMapper mapper = new ObjectMapper();
        String result = null;
        try {
            result = mapper.writeValueAsString(newsItem);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return result;
    }
}
