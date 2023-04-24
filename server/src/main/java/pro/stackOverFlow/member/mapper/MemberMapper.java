package pro.stackOverFlow.member.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import pro.stackOverFlow.answer.dto.AnswerMyPageDto;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.dto.MemberDto;
import pro.stackOverFlow.member.dto.MemberMyPageDto;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.dto.QuestionMyPageDto;
import pro.stackOverFlow.question.entity.Question;

import java.util.List;
import java.util.stream.Collectors;

//import static java.util.stream.Nodes.collect;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post requestBody);
    Member memberPatchDtoToMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponseDto(Member member);
    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

    default MemberMyPageDto memberToMemberMyPageDto(Member member) { // 완료
        if (member == null) {
            return null;
        }
        MemberMyPageDto memberMyPageDto = new MemberMyPageDto();
        memberMyPageDto.setMemberId(member.getMemberId());
        memberMyPageDto.setEmail(member.getEmail());
        memberMyPageDto.setDisplayName(member.getDisplayName());
        memberMyPageDto.setTitle(member.getTitle());
        memberMyPageDto.setAboutMe(member.getAboutMe());


        List<Answer> answerList = member.getAnswers(); // 답변 리스트
        List<AnswerMyPageDto> answerMyPageDtoList = answerList.stream().map(answer ->{
            AnswerMyPageDto answerMyPageDto = new AnswerMyPageDto();
            answerMyPageDto.setAnswerId(answer.getAnswerId());
            answerMyPageDto.setContent(answer.getContent());
            answerMyPageDto.setCreatedAt(answer.getCreatedAt());
            return answerMyPageDto;

        }).collect(Collectors.toList());
        memberMyPageDto.setAnswers(answerMyPageDtoList);
//
        List<Question> questionList = member.getQuestions(); // 질문 리스트
        List<QuestionMyPageDto> questionMyPageDtoList = questionList.stream().map(question ->{
            QuestionMyPageDto questionMyPageDto = new QuestionMyPageDto();
            questionMyPageDto.setQuestionId(question.getQuestionId());
            questionMyPageDto.setTitle(question.getTitle());
            questionMyPageDto.setContent(question.getContent());
            questionMyPageDto.setCreatedAt(question.getMember().getCreatedAt());
            return questionMyPageDto;
        }).collect(Collectors.toList());
        memberMyPageDto.setQuestions(questionMyPageDtoList);

        return memberMyPageDto;
    }

}
