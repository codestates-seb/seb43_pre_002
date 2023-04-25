package pro.stackOverFlow.question.dto;

import lombok.*;

@Data
@Builder
public class QuestionVoteResponseDto {
    private Long questionId;
    private Long questionVoteCount;
}
