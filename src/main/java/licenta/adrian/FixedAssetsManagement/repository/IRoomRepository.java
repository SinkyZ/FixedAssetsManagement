package licenta.adrian.FixedAssetsManagement.repository;

import licenta.adrian.FixedAssetsManagement.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IRoomRepository extends JpaRepository<Room, String> {
    void deleteRoomById(String id);
    List<Room> findRoomsByBuildingId(String buildingId);
    Optional<Room> findRoomById(String id);
}
