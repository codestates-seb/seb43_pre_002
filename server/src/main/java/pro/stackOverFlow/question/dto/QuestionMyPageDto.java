package pro.stackOverFlow.question.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionMyPageDto {
    private long questionId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private Long ViewCount;
    private Long VoteCount;

}