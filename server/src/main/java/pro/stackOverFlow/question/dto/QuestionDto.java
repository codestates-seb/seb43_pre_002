package pro.stackOverFlow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class QuestionDto {

    @Getter
    public static class Post {
        @NotBlank
        private String title;
        private String content;
    }

    @Getter
    public static class Patch {
        private long questionId;
        @NotBlank
        private String title;
        private String content;

        public void setQuestionId(long questionId) {
            this.questionId = questionId;
        }
    }

    @Getter
    public static class Response {
        private long questionId;
        private String title;
        private String content;
    }


}
