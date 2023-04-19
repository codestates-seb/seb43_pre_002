package pro.stackOverFlow.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponseDto {
    private long answerId;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private String answerSelectionStatus;

    private int voteCount;

}
