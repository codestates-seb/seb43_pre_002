package pro.stackOverFlow.answer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AnswerVoteDto {

    private Long answerId;

    private Long memberId;

    private boolean isUpvote;

}
