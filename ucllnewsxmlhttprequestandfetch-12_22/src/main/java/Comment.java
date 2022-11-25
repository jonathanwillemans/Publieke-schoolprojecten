import java.time.LocalDate;

public class Comment {
    private String autheur;
    private String text;
    private LocalDate tijd;

    public Comment(String autheur, String text, LocalDate tijd) {
        this.autheur = autheur;
        this.text = text;
        this.tijd = tijd;
    }

    public Comment() {
    }

    public String getAutheur() {
        return autheur;
    }

    public void setAutheur(String autheur) {
        this.autheur = autheur;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDate getTijd() {
        return tijd;
    }

    public void setTijd(LocalDate tijd) {
        this.tijd = tijd;
    }
}
