package pro.stackOverFlow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SingleResponseDto<T> {
    private T Data;
}
