import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import java.beans.PropertyVetoException;
import java.io.IOException;
import java.net.URL;
import java.sql.SQLException;
import java.util.List;

public class App {
    private static final String URL =
            "https://interest-points.herokuapp.com/api/interest-points/city/Beijing/Beijing-interest-points.json";
    private static ObjectMapper mapper;

    public static void main(String[] args) throws IOException {
        mapper = new ObjectMapper();

        List<InterestPoint> ips =
                mapper.readValue(
                        new URL(URL),
                        new TypeReference<List<InterestPoint>>(){}
                );

        int tam = ips.size();

        System.out.println(tam);

        //Repo.save(ips);

        System.out.println("FINISH");

    }
}
