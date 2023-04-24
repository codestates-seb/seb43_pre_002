package pro.stackOverFlow.question.mapper;

import org.springframework.stereotype.Component;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.dto.QuestionGetAnswerDto;
import pro.stackOverFlow.question.dto.QuestionGetResponseDto;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.question.dto.QuestionVoteResponseDto;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class QuestionMapperIm {

    public Question questionPostDtoToQuestion(QuestionDto.Post requestBody, Member member) {
        if (requestBody == null
//                || member == null
        ) {
            return null;
        }
        Question question = new Question();
        question.setTitle(requestBody.getTitle());
        question.setContent(requestBody.getContent());
//        question.setMember(member);
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
                            .answerContent(answer.getContent())
                            .answerVoteCount((long) answer.getVoteCount())
//                            .memberId(answer.getMember().getMemberId())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public QuestionGetResponseDto questionInfoToQuestionGetResponseDto(Question question, Member member, List<QuestionGetAnswerDto> answers) {
        if (question == null ||
//                member == null ||
                answers == null) {
            return null;
        }

        return QuestionGetResponseDto.builder()
                .questionId(question.getQuestionId())
//                .memberId(member.getMemberId())
//                .email(member.getEmail())
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
