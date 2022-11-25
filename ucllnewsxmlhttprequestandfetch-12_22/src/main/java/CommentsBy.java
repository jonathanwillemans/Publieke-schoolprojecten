import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public class CommentsBy extends RequestHandler{





    private String CommentsToJSON(List<Comment> comment) {
        ObjectMapper mapper = new ObjectMapper();
        String result = null;
        try {
            result = mapper.writeValueAsString(comment);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        List<Comment> comment = getService().getAllCommentsFromName(request.getParameter("author"));
        System.out.printf(request.getParameter("author"));
        return CommentsToJSON(comment);
    }
}
