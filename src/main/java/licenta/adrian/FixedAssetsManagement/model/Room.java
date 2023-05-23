package licenta.adrian.FixedAssetsManagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @ManyToMany(mappedBy = "rooms", fetch = FetchType.LAZY)
    private Set<User> users;

    public Room(String id, String number, Building building, List<Asset> assets, Set<User> users) {
        this.id = id;
        this.number = number;
        this.building = building;
        this.assets = assets;
        this.users = users;
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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id='" + id + '\'' +
                ", number='" + number + '\'' +
                ", building=" + building +
                ", assets=" + assets +
                ", users=" + users +
                '}';
    }
}
