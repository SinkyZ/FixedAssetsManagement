package licenta.adrian.FixedAssetsManagement.auth;

import licenta.adrian.FixedAssetsManagement.configuration.JwtService;
import licenta.adrian.FixedAssetsManagement.model.User;
import licenta.adrian.FixedAssetsManagement.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private void authenticate(String email, String password) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    public JwtResponse createJwtToken(AuthenticationRequest request) throws Exception {
        String email = request.getEmail();
        String password = request.getPassword();

        authenticate(email, password);

        User user = userService.getUserByEmail(request.getEmail());
        String jwtToken = jwtService.generateToken(user);

        return new JwtResponse(user, jwtToken);
    }
}
