package pro.stackOverFlow.member.dto;

import lombok.Getter;
import lombok.Setter;
import pro.stackOverFlow.answer.dto.AnswerMyPageDto;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.dto.QuestionMyPageDto;

import java.util.List;

@Getter
@Setter
public class MemberMyPageDto {
    private long memberId;
    private String email;
    private String displayName;
    private String title;
    private String aboutMe;
    private List<QuestionMyPageDto> questions;
    private List<AnswerMyPageDto> answers;
}