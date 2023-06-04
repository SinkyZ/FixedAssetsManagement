package licenta.adrian.FixedAssetsManagement.auth;

import licenta.adrian.FixedAssetsManagement.configuration.JwtService;
import licenta.adrian.FixedAssetsManagement.model.User;
import licenta.adrian.FixedAssetsManagement.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(),
                request.getPassword())
        );

        User user = userService.getUserByEmail(request.getEmail());
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
