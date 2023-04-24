package pro.stackOverFlow.question.mapper;

import org.mapstruct.Mapper;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostDtoToQuestion(QuestionDto.Post requestBody);

    Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody);

    QuestionDto.Response questionToQuestionResponse(Question question);

    List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions);


}
