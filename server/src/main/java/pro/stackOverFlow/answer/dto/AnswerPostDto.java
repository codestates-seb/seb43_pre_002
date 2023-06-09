package pro.stackOverFlow.answer.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class AnswerPostDto {

    @NotBlank
    private String content;

}
