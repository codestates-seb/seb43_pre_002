package pro.stackOverFlow.vote.dto;

import lombok.*;

@Data
@Builder
public class QuestionVoteResponseDto {
    private Long questionId;
    private Long questionVoteCount;
}
