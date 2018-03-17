import java.beans.PropertyVetoException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

public class Repo {

    public static void save (List<InterestPoint> points) {
        Connection connection = null;
        PreparedStatement stmt = null;

        String query = "insert into interest_points (ipid,name,latitude,longitude,geom) " +
                "values (?,?,?,?,ST_SetSRID(ST_MakePoint(?, ?), 4326));";

        try {
            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);
            stmt = connection.prepareStatement(query);

            for (int i = 0; i < points.size(); i++) {
                InterestPoint ip = points.get(i);

                stmt.setLong(1, ip.getId().longValue());
                stmt.setString(2, ip.getName());
                stmt.setDouble(3, ip.getLat());
                stmt.setDouble(4, ip.getLon());
                //GEOMETRY
                stmt.setDouble(5, ip.getGeometry().getCentroid().getX()); // Longitude
                stmt.setDouble(6, ip.getGeometry().getCentroid().getY()); // Latitude
                stmt.addBatch();
            }

            // For remaining data
            stmt.executeBatch();

            connection.commit();
        } catch (SQLException | IOException | PropertyVetoException e) {
            try {
                if (stmt != null)
                    stmt.clearBatch();

                e.printStackTrace();
            } catch (SQLException e1) {
                e1.printStackTrace();
            }
        }
    }

}
