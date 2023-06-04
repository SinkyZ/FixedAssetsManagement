package licenta.adrian.FixedAssetsManagement.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import licenta.adrian.FixedAssetsManagement.auth.AuthenticationResponse;
import licenta.adrian.FixedAssetsManagement.auth.PasswordGenerator;
import licenta.adrian.FixedAssetsManagement.configuration.JwtService;
import licenta.adrian.FixedAssetsManagement.dto.UserDTO;
import licenta.adrian.FixedAssetsManagement.model.Room;
import licenta.adrian.FixedAssetsManagement.model.User;
import licenta.adrian.FixedAssetsManagement.services.RoomService;
import licenta.adrian.FixedAssetsManagement.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@PreAuthorize("hasRole('ADMIN')")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    @Autowired
    private final UserService userService;
    private final RoomService roomService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordGenerator passwordGenerator;

     public UserController(UserService userService, RoomService roomService, JwtService jwtService, PasswordEncoder passwordEncoder, PasswordGenerator passwordGenerator)
     {
         this.userService = userService;
         this.roomService = roomService;
         this.jwtService = jwtService;
         this.passwordEncoder = passwordEncoder;
         this.passwordGenerator = passwordGenerator;
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

    @GetMapping("/email")
    public ResponseEntity<User> getUserByEmail(String email){
        User user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK );
    }
    @PostMapping
    public AuthenticationResponse addUser(@RequestBody UserDTO userDTO){
        User newUser = new User();
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(passwordGenerator.randomPasswordGenerator()));
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setPhone(userDTO.getPhone());
        newUser.setRole(userDTO.getRole());
        userService.addUser(newUser);
        String jwtToken = jwtService.generateToken(newUser);
        return AuthenticationResponse.builder().token(jwtToken).build();
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
