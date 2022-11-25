import java.time.LocalDate;
import java.util.ArrayList;

public class NewsItem {
    private String title;
    private String content;
    private LocalDate datum;
    private String autheur;
    private ArrayList<Comment> comments;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDatum() {
        return datum;
    }

    public void setDatum(LocalDate datum) {
        this.datum = datum;
    }

    public String getAutheur() {
        return autheur;
    }

    public void setAutheur(String autheur) {
        this.autheur = autheur;
    }

    public void addComment(Comment comment){
        comments.add(comment);
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }

    public NewsItem(String title, String content, LocalDate datum, String autheur, ArrayList<Comment> comments) {
        setTitle(title);
        setContent(content);
        setDatum(datum);
        setAutheur(autheur);

    }

    public NewsItem(String title, String content, LocalDate datum, String autheur) {
        setTitle(title);
        setContent(content);
        setDatum(datum);
        setAutheur(autheur);
        comments = new ArrayList<>();
    }

    public NewsItem() {
    }
}
