package licenta.adrian.FixedAssetsManagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import net.bytebuddy.utility.nullability.AlwaysNull;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
public class Room implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    private String id;
    private String number;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buildingId")
    private Building building;

    @OneToMany(mappedBy ="room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Asset> assets;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @Nullable
    @JoinColumn(name = "userId", nullable = true)
    private User user;

    public Room(String id, String number, Building building, List<Asset> assets) {
        this.id = id;
        this.number = number;
        this.building = building;
        this.assets = assets;
    }

    public Room() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assets) {
        this.assets = assets;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id='" + id + '\'' +
                ", number='" + number + '\'' +
                ", building=" + building +
                ", assets=" + assets +
                ", user=" + user +
                '}';
    }
}
