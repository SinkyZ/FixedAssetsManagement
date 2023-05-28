package licenta.adrian.FixedAssetsManagement.controllers;

import licenta.adrian.FixedAssetsManagement.dto.RoomDTO;

import licenta.adrian.FixedAssetsManagement.model.Asset;
import licenta.adrian.FixedAssetsManagement.model.Room;
import licenta.adrian.FixedAssetsManagement.services.AssetService;
import licenta.adrian.FixedAssetsManagement.services.BuildingService;
import licenta.adrian.FixedAssetsManagement.services.RoomService;
import licenta.adrian.FixedAssetsManagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("buildings/rooms")
public class RoomController {

    @Autowired
    private final BuildingService buildingService;
    private final RoomService roomService;
    private final AssetService assetService;

    public RoomController(BuildingService buildingService, RoomService roomService, AssetService assetService) {
        this.buildingService = buildingService;
        this.roomService = roomService;
        this.assetService = assetService;
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms(){
        List<Room> allRooms = roomService.getAllRooms();
        return new ResponseEntity<>(allRooms, HttpStatus.OK);
    }

    @GetMapping("room/{roomId}")
    public ResponseEntity<List<Asset>> getAssetsByRoomId(@PathVariable("roomId") String roomId) {
        List<Asset> allAssetsByRoomId = assetService.getAssetsByRoomId(roomId);
        return new ResponseEntity<>(allAssetsByRoomId, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Room> getRoomId(@PathVariable("id") String id){
        Room room = roomService.getRoomById(id);
        return new ResponseEntity<>(room, HttpStatus.OK );
    }
    @PostMapping
    public ResponseEntity<Room> addRoom(@RequestBody RoomDTO roomDTO){
        Room newRoom = new Room();
        newRoom.setNumber(roomDTO.getNumber());
        newRoom.setBuilding(buildingService.getBuildingById(roomDTO.getBuildingId()));
        roomService.addRoom(newRoom);
        return new ResponseEntity<>(newRoom, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable("id") String id, @RequestBody Room room){
        Room roomToUpdate = roomService.getRoomById(id);
        roomToUpdate.setNumber(room.getNumber());
        roomService.updateRoom(roomToUpdate);
        return new ResponseEntity<>(roomToUpdate, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable("id") String id){
        roomService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
