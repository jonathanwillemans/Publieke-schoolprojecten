import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class Overview extends RequestHandler {

    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        List<NewsItem> newsItem = getService().getAll();
        return newsItemToJSON(newsItem);
    }


    private String newsItemToJSON(List<NewsItem> newsItem) {
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


