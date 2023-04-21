package pro.stackOverFlow.vote.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.vote.dto.VoteDto;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-20T15:49:24+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class VoteMapperImpl implements VoteMapper {

    @Override
    public VoteDto.Response questionToQuestionVoteResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        long questionId = 0L;

        if ( question.getQuestionId() != null ) {
            questionId = question.getQuestionId();
        }

        int voteCount = 0;

        VoteDto.Response response = new VoteDto.Response( questionId, voteCount );

        return response;
    }
}
