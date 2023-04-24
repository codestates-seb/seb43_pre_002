package pro.stackOverFlow.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.util.Assert;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.entity.Question;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {
    @Getter
    @NoArgsConstructor
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
    @NoArgsConstructor
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
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;


    }
}
