package pro.stackOverFlow.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrueFalseResponseDto {
    private boolean success;
    private String message;
}
