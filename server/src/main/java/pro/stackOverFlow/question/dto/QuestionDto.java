package pro.stackOverFlow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class QuestionDto {

    @Getter
    @Setter
    public static class Post {
        @NotBlank
        private String title;
        private String content;
//        private Long memberId;
    }

    @Getter
    @Setter
    public static class Patch {
        private long questionId;
        @NotBlank
        private String title;
        private String content;
        private LocalDateTime questionCreatedAt;
        private LocalDateTime questionModifiedAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long questionId;
        private String title;
        private String content;
        private long viewCount;
    }

}
