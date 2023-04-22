package pro.stackOverFlow.vote.mapper;

import org.springframework.stereotype.Component;
import pro.stackOverFlow.vote.dto.QuestionVoteResponseDto;
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
