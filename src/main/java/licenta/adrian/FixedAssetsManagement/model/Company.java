package licenta.adrian.FixedAssetsManagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Company implements Serializable {

    @Id
    @Column(nullable = false, updatable = false)
    private String id;
    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Building> buildings = new ArrayList<Building>();

    public Company(String id, String name, List<Building> buildings) {
        this.id = id;
        this.name = name;
        this.buildings = buildings;
    }
    public Company() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Building> getBuildings() {
        return buildings;
    }

    public void setBuildings(List<Building> buildings) {
        this.buildings = buildings;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", users=" + buildings +
                '}';
    }
}
