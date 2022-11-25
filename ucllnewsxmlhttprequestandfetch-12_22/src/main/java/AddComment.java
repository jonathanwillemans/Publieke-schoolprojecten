import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;

public class AddComment extends RequestHandler{
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        Comment comment= new Comment(request.getParameter("autheur"),request.getParameter("text"), LocalDate.now());
        newsRepository.addComment(request.getParameter("title"), comment);
        System.out.printf("test");
        return "OK";
    }
}
