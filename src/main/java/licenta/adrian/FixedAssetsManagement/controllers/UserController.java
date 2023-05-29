package licenta.adrian.FixedAssetsManagement.controllers;

import licenta.adrian.FixedAssetsManagement.dto.UserDTO;
import licenta.adrian.FixedAssetsManagement.model.Asset;
import licenta.adrian.FixedAssetsManagement.model.Room;
import licenta.adrian.FixedAssetsManagement.model.User;
import licenta.adrian.FixedAssetsManagement.services.RoomService;
import licenta.adrian.FixedAssetsManagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserService userService;
    private final RoomService roomService;

     public UserController(UserService userService, RoomService roomService)
     {
         this.userService = userService;
         this.roomService = roomService;
     }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> allUsers = userService.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<Room>> getRoomsByUserId(@PathVariable("userId") String userId) {
        List<Room> allRoomsByUserId = roomService.getRoomByUserId(userId);
        return new ResponseEntity<>(allRoomsByUserId, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id){
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK );
    }
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody UserDTO userDTO){
        User newUser = new User();
        //TODO: Decide how u encrypt and set the password.
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(userDTO.getPassword());
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setPhone(userDTO.getPhone());
        newUser.setRole(userDTO.getRole());
        userService.addUser(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user){
        User userToUpdate = userService.getUserById(id);
        //TODO: Decide what u want to update for an user.
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setFirstName(user.getFirstName());
        userToUpdate.setLastName(user.getLastName());
        userToUpdate.setRole(user.getRole());
        userToUpdate.setPhone(user.getPhone());
        userService.updateUser(userToUpdate);
        return new ResponseEntity<>(userToUpdate, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id){
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

        @PutMapping("userDetails/{id}/{roomId}")
        public ResponseEntity<Room> updateUser(@PathVariable("id") String id, @PathVariable String roomId){
            User user = userService.getUserById(id);
            Room room = roomService.getRoomById(roomId);

            room.setUser(user);
            roomService.updateRoom(room);
            return new ResponseEntity<>(room, HttpStatus.OK);
        }
}
