package pro.stackOverFlow.vote.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import pro.stackOverFlow.question.dto.QuestionVoteResponseDto;
import pro.stackOverFlow.question.entity.Question;

@Component
public class VoteMapper {

    public QuestionVoteResponseDto questionToQuestionVoteResponseDto(Question question) {

            return QuestionVoteResponseDto.builder()
                    .questionId(question.getQuestionId())
                    .questionVoteCount(question.getQuestionVoteCount())
                    .build();

    }

}
