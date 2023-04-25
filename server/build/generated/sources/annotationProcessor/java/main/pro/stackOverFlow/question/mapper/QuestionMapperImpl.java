package pro.stackOverFlow.question.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.entity.Question;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-24T15:11:24+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPostDtoToQuestion(QuestionDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Question.QuestionBuilder question = Question.builder();

        question.title( requestBody.getTitle() );
        question.content( requestBody.getContent() );

        return question.build();
    }

    @Override
    public Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Question.QuestionBuilder question = Question.builder();

        question.questionId( requestBody.getQuestionId() );
        question.title( requestBody.getTitle() );
        question.content( requestBody.getContent() );

        return question.build();
    }

    @Override
    public QuestionDto.Response questionToQuestionResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        long questionId = 0L;
        String title = null;
        String content = null;
        int viewCount = 0;

        if ( question.getQuestionId() != null ) {
            questionId = question.getQuestionId();
        }
        title = question.getTitle();
        content = question.getContent();
        viewCount = (int) question.getViewCount();

        QuestionDto.Response response = new QuestionDto.Response( questionId, title, content, viewCount );

        return response;
    }

    @Override
    public List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<QuestionDto.Response> list = new ArrayList<QuestionDto.Response>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToQuestionResponse( question ) );
        }

        return list;
    }
}