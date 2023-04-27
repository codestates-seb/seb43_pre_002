package pro.stackOverFlow.question.mapper;

import org.springframework.stereotype.Component;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.dto.*;
import pro.stackOverFlow.question.entity.Question;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class QuestionMapper {

    public Question questionPostDtoToQuestion(QuestionDto.Post requestBody, Member member) {
        if (requestBody == null || member == null) {
            return null;
        }
        Question question = new Question();
        question.setTitle(requestBody.getTitle());
        question.setContent(requestBody.getContent());
        question.setMember(member);

        return question;
    }


    public Question questionPatchDtoToQuestion(QuestionDto.Patch requestBody, Question question, Member member) {
        if (requestBody == null || question == null || member == null) {
            return null;
        }
        if (question.getMember().getMemberId().equals(member.getMemberId())) {
            if (requestBody.getTitle() != null) {
                question.setTitle(requestBody.getTitle());
            }
            if (requestBody.getContent() != null) {
                question.setContent(requestBody.getContent());
            }
        }
        return question;
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
                            .answerModifiedAt(answer.getModifiedAt())
                            .answerContent(answer.getContent())
                            .answerVoteCount(answer.getVoteCount())
                            .memberId(answer.getMember().getMemberId())
                            .answerAccepted(answer.isAccepted())
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
