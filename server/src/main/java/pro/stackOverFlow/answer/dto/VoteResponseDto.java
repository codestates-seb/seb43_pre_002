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
public class VoteResponseDto {
    private boolean success;

    private long voteCount;

    private String message;
}
