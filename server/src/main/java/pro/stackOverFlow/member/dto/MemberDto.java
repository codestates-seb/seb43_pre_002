package pro.stackOverFlow.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.util.Assert;
import pro.stackOverFlow.member.entity.Member;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank
        private String displayName;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;
        private String displayName;
        private String title;
        private String aboutMe;
        private String websiteLink;

        private String twitterLink;

        private String githubLink;

        private String notionLink;

        private String blogLink;







        public Patch addMemberId(Long memberId) {
            Assert.notNull(memberId, "member id must not be null.");
            this.memberId = memberId;

            return this;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String email;
        private String displayName;
        private String title;
        private String aboutMe;
        private String websiteLink;

        private String twitterLink;

        private String githubLink;

        private String notionLink;

        private String blogLink;

    }
}
