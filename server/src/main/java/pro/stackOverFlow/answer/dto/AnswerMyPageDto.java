package pro.stackOverFlow.answer.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnswerMyPageDto {
    private long answerId;
    private String content;
    private LocalDateTime createdAt;
    private long questionId;
    private String title;
    private Long voteCount;
}