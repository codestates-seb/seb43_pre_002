package pro.stackOverFlow.answer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class AnswerPatchDto {

    private long answerId;

    @NotBlank
    private String content;

    private String answerSelectionStatus;

}
