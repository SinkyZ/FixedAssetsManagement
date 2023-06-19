package licenta.adrian.FixedAssetsManagement.roles;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    SECRETARY_READ("secretary:read"),
    SECRETARY_UPDATE("secretary:update"),
    SECRETARY_CREATE("secretary:create"),
    SECRETARY_DELETE("secretary:delete");


    @Getter
    private final String permission;
}
