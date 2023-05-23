package licenta.adrian.FixedAssetsManagement.services;

import licenta.adrian.FixedAssetsManagement.exception.RoomNotFoundException;
import licenta.adrian.FixedAssetsManagement.exception.UserNotFoundException;
import licenta.adrian.FixedAssetsManagement.model.Building;
import licenta.adrian.FixedAssetsManagement.model.Room;
import licenta.adrian.FixedAssetsManagement.repository.IRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class RoomService {
    private final IRoomRepository roomRepository;

    @Autowired
    public RoomService(IRoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room addRoom(Room room){
        room.setId(UUID.randomUUID().toString());
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }

    public List<Room> getRoomsByBuildingId(String buildingId){
        return roomRepository.findRoomsByBuildingId(buildingId);
    }
    public Room updateRoom(Room room){
        return roomRepository.save(room);
    }
    public Room getRoomById(String id){
        return roomRepository.findRoomById(id)
                .orElseThrow(() -> new RoomNotFoundException("Room by id" + id + "not found"));
    }
    public void deleteRoom(String id){
        roomRepository.deleteRoomById(id);
    }

}
