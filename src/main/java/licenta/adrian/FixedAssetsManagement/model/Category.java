package licenta.adrian.FixedAssetsManagement.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category {
    @Id
    @Column(name = "id", nullable = false)
    private String id;
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Asset> assets;

    public Category(String id, String name, List<Asset> assets) {
        this.id = id;
        this.name = name;
        this.assets = assets;
    }

    public Category() {

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

    public List<Asset> getAssets() {
        return assets;
    }

    public void setAssets(List<Asset> assets) {
        this.assets = assets;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", assets=" + assets +
                '}';
    }
}
