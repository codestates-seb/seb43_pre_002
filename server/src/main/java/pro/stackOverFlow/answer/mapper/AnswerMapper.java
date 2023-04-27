package pro.stackOverFlow.answer.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Service;
import pro.stackOverFlow.answer.dto.AnswerPatchDto;
import pro.stackOverFlow.answer.dto.AnswerPostDto;
import pro.stackOverFlow.answer.dto.AnswerResponseDto;
import pro.stackOverFlow.answer.entity.Answer;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);
    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);

}
