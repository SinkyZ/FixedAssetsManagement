package licenta.adrian.FixedAssetsManagement.auth;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;


@Service
public final class PasswordGenerator {

    public  String randomPasswordGenerator() {
        char[] possibleCharacters = (new String("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?")).toCharArray();
        String randomStr = RandomStringUtils.random( 10, 0, possibleCharacters.length-1, false, false, possibleCharacters, new SecureRandom() );

        return randomStr;
    }
}
