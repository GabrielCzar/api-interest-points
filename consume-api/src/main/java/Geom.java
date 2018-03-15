import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.GeometryFactory;

import java.util.List;

public class Geom {
    private GeometryFactory gf = new GeometryFactory();
    private String type;
    private List<Double> coordinates;

    public Geom () {}

    public Geom(String type, List<Double> coordinates) {
        this.type = type;
        this.coordinates = coordinates;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }

    public Geometry getGeometry() {
        return gf.createPoint(
                new Coordinate(
                        coordinates.get(0), // lon
                        coordinates.get(1)  // lat
                )
        );
    }

    public Double getLatitude() {
        return coordinates.get(1);
    }

    public Double getLongitude() {
        return coordinates.get(0);
    }
}