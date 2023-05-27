package licenta.adrian.FixedAssetsManagement.dto;

public class AssetDTO {
    private String name;
    private String description;
    private String isWorking;
    private String roomId;
    private String category;

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

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getWorking() {
        return isWorking;
    }

    public void setWorking(String working) {
        isWorking = working;
    }
}
