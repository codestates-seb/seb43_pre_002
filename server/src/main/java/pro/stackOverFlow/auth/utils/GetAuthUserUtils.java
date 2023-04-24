package pro.stackOverFlow.auth.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;

public class GetAuthUserUtils {
    public static Authentication getAuthUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getName() == null || authentication.getName().equals("anonymousUser")){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER);
        }
        authentication.getPrincipal();
        return authentication;
    }
}