package pro.stackOverFlow.question.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class QuestionGetAnswerDto {
    private Long answerId;
    private LocalDateTime answerCreatedAt;
    private LocalDateTime answerModifiedAt;
    private String answerContent;
    private Long answerVoteCount;
    private Long memberId;
    private boolean answerAccepted;
}
