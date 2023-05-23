package licenta.adrian.FixedAssetsManagement.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Asset implements Serializable {
    @Id
    @Column(nullable = false, updatable = false)
    private String id;
    private String name;
    private String description;

    private Boolean isWorking;

    @Column(nullable = false, updatable = false)
    private String code;

    @JsonIgnore
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "roomId")
    private Room room;

    @JsonIgnore
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")
    private Category category;

    public Asset(String id, String name, String description, Boolean isWorking, String code, Room room, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isWorking = isWorking;
        this.code = code;
        this.room = room;
        this.category = category;
    }

    public Asset() {

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getWorking() {
        return isWorking;
    }

    public void setWorking(Boolean working) {
        isWorking = working;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", isWorking=" + isWorking +
                ", code='" + code + '\'' +
                ", room=" + room +
                ", category=" + category +
                '}';
    }
}
