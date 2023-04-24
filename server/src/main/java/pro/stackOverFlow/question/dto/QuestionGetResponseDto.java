package pro.stackOverFlow.question.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class QuestionGetResponseDto {
    private Long questionId;
    private Long memberId ;
    private String email;
    private String questionTitle;
    private String questionContent;
    private LocalDateTime questionCreatedAt;
    private LocalDateTime questionModifiedAt;
    private Long questionViewCount;
    private Long questionVoteCount;
    private List<QuestionGetAnswerDto> answers;
}

