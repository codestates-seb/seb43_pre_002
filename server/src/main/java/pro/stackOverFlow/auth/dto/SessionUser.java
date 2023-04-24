package pro.stackOverFlow.auth.dto;

import lombok.Getter;
import pro.stackOverFlow.member.entity.Member;

@Getter
public class SessionUser {
    private String name;
    private String email;

    public SessionUser(Member member) {
        this.name = member.getDisplayName();
        this.email = member.getEmail();
    }
}