package pro.stackOverFlow.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    private String email;
    private String password;
}
