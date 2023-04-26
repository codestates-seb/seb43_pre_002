package pro.stackOverFlow.question.mapper;

import org.springframework.stereotype.Component;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.dto.*;
import pro.stackOverFlow.question.entity.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class QuestionMapper {

    // Post
    public Question questionPostDtoToQuestion(QuestionDto.Post requestBody/*, Member member*/) {
        if (requestBody == null /*|| member == null*/) {
            return null;
        }
        Question question = new Question();
        question.setTitle(requestBody.getTitle());
        question.setContent(requestBody.getContent());
//        question.setMember(member);
        return question;
    }

    // patch
    public Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody) {
        if (requestBody == null) {
            return null;
        }

        Question question = new Question();
        question.setQuestionId(requestBody.getQuestionId());
        question.setTitle(requestBody.getTitle());
        question.setContent(requestBody.getContent());
        question.setCreatedAt(requestBody.getQuestionCreatedAt());
        question.setModifiedAt(requestBody.getQuestionModifiedAt());

        return question;
    }

    // Response
    public QuestionDto.Response questionToQuestionResponse(Question question) {
        if (question == null) {
            return null;
        }

        long questionId = 0L;
        String title = null;
        String content = null;
        long viewCount = 0;

        if (question.getQuestionId() != null) {
            questionId = question.getQuestionId();
        }
        title = question.getTitle();
        content = question.getContent();
        viewCount = question.getViewCount();

        return new QuestionDto.Response(questionId, title, content, viewCount);
    }

    // get all
    public List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions) {
        if (questions == null) {
            return null;
        }

        List<QuestionDto.Response> list = new ArrayList<QuestionDto.Response>(questions.size());
        for (Question question : questions) {
            list.add(questionToQuestionResponse(question));
        }

        return list;
    }

    public List<QuestionGetAnswerDto> answersToQuestionGetAnswerDto(List<Answer> answers) {
        if (answers == null) {
            return null;
        }

        return answers.stream()
                .map(answer -> {
                    return QuestionGetAnswerDto.builder()
                            .answerId(answer.getAnswerId())
                            .answerCreatedAt(answer.getCreatedAt())
                            .answerContent(answer.getContent())
                            .answerVoteCount(answer.getVoteCount())
                            .memberId(answer.getMember().getMemberId())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public QuestionGetResponseDto questionInfoToQuestionGetResponseDto(Question question, Member member, List<QuestionGetAnswerDto> answers) {
        if (question == null || member == null || answers == null) {
            return null;
        }

        return QuestionGetResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .questionTitle(question.getTitle())
                .questionContent(question.getContent())
                .questionCreatedAt(question.getCreatedAt())
                .questionModifiedAt(question.getModifiedAt())
                .questionViewCount(question.getViewCount())
                .questionVoteCount(question.getQuestionVoteCount())
                .answers(answers)
                .build();
    }

    public QuestionVoteResponseDto questionToQuestionVoteResponseDto(Question question) {

        return QuestionVoteResponseDto.builder()
                .questionId(question.getQuestionId())
                .questionVoteCount(question.getQuestionVoteCount())
                .build();

    }
}
