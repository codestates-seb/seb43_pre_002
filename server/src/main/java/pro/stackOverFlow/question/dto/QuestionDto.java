package pro.stackOverFlow.question.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class QuestionDto {

    @Data
    @Builder
    public static class Post {
        @NotBlank
        private String title;
        private String content;
    }

    @Data
    @Builder
    public static class Patch {
        private long questionId;
        @NotBlank
        private String title;
        private String content;
        private LocalDateTime questionCreatedAt;
        private LocalDateTime questionModifiedAt;
    }

    @Data
    @Builder
    public static class Response {
        private long questionId;
        private String title;
        private String content;
        private long viewCount;
    }

}
