import com.vividsolutions.jts.geom.Geometry;

import java.math.BigInteger;

public class InterestPoint {
    private BigInteger id;
    private String name;
    private String amenity;
    private Double lat;
    private Double lon;
    private GeometryJSON geometry;

    public InterestPoint() { }

    public InterestPoint(BigInteger id, String name, String amenity, Double lat, Double lon) {
        this.id = id;
        this.name = name;
        this.amenity = amenity;
        this.lat = lat;
        this.lon = lon;
    }

    public InterestPoint(BigInteger id, String name, String amenity, Double lat, Double lon, GeometryJSON geometry) {
        this.id = id;
        this.name = name;
        this.amenity = amenity;
        this.lat = lat;
        this.lon = lon;
        this.geometry = geometry;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAmenity() {
        return amenity;
    }

    public void setAmenity(String amenity) {
        this.amenity = amenity;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public Geometry getGeometry() {
        return geometry.getGeometry();
    }


}
