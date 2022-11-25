import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;


public class NewsRepository {
    private List<NewsItem> newsItems = new ArrayList<NewsItem>();

    public NewsRepository() {
        NewsItem n=new NewsItem("Ruslandisgay","Rusland is ook heel Europa binnengevallen en gaat zijn kernwapens gebruiken", LocalDate.now(),"Jonathan");
        NewsItem b=new NewsItem("Mooiweer","De zon komt er elke dag weer meer en meer door, binnekort zullen we terug zonnecreme moeten smeren.", LocalDate.now(),"Jonas");

        newsItems.add(n);
        newsItems.add(b);

        b.addComment(new Comment( "Zonny", "Leuke post",LocalDate.now()));
        n.addComment(new Comment( "Jonagold","Sike, ik heb een bunker met een ps5", LocalDate.now()));
        b.addComment(new Comment( "Sam","En verbranden zeker! Dacht het niet", LocalDate.now()));

    }

    public List<NewsItem> getAll() {
        return newsItems;
    }

    public void add (NewsItem n) {
        newsItems.add(n);
    }

    public NewsItem getRandomItem() {
        Random random = new Random();
        int position = random.nextInt(newsItems.size());
        return newsItems.get(position);
    }
    public NewsItem getItemWithTitle(String title) {
        if (title== null||title.isEmpty()) throw new IllegalArgumentException("titel is null");

        for (NewsItem n:newsItems) {
            if (n.getTitle().equals(title)) return n;
        }

        throw new IllegalArgumentException("titel werd niet gevonden");
    }

    public List<Comment> getAllCommentsFromName(String name) {
        List<Comment> res =  new ArrayList<>();
        for(NewsItem i : newsItems){

            for(Comment x : i.getComments()){

                if(x.getAutheur().equals(name)){

                    res.add(x);
                }
            }
        }
        return res;

    }

    public void addComment(String title, Comment comment){
        for(NewsItem i : newsItems){
            if(i.getTitle().equals(title)){
                i.addComment(comment);
            }
        }
    }
}
