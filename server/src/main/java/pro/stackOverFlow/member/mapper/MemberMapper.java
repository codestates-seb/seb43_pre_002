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

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {
     default Member memberPostDtoToMember(MemberDto.Post requestBody) {
         if ( requestBody == null ) {
             return null;
         }

         Member.MemberBuilder member = Member.builder();

         member.email( requestBody.getEmail() );
         member.password( requestBody.getPassword() );
         member.displayName( requestBody.getDisplayName() );
         member.websiteLink("https://website.com");
         member.twitterLink("https://twitter.com");
         member.githubLink("https://github.com");
         member.notionLink("https://notion.com");
         member.blogLink("https://blog.com");

         return member.build();
     }


    Member memberPatchDtoToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponseDto(Member member);

    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

    default MemberMyPageDto memberToMemberMyPageDto(Member member) {

        if (member == null) {
            return null;
        }

        MemberMyPageDto memberMyPageDto = new MemberMyPageDto();
        memberMyPageDto.setMemberId(member.getMemberId());
        memberMyPageDto.setEmail(member.getEmail());
        memberMyPageDto.setDisplayName(member.getDisplayName());
        memberMyPageDto.setTitle(member.getTitle());
        memberMyPageDto.setAboutMe(member.getAboutMe());
        memberMyPageDto.setWebsiteLink(member.getWebsiteLink());
        memberMyPageDto.setTwitterLink(member.getTwitterLink());
        memberMyPageDto.setGithubLink(member.getGithubLink());
        memberMyPageDto.setNotionLink(member.getNotionLink());
        memberMyPageDto.setBlogLink(member.getBlogLink());


        for (Question question :member.getQuestions()) {
            int answerCount = question.getAnswers().size();
            question.setAnswerCount(answerCount);
        }

        List<Question> questionList = member.getQuestions();
        List<QuestionMyPageDto> questionMyPageDtoList = questionList.stream().map(question ->{
            QuestionMyPageDto questionMyPageDto = new QuestionMyPageDto();
            questionMyPageDto.setQuestionId(question.getQuestionId());
            questionMyPageDto.setTitle(question.getTitle());
            questionMyPageDto.setContent(question.getContent());
            questionMyPageDto.setCreatedAt(question.getMember().getCreatedAt());
            questionMyPageDto.setAnswerCount(question.getAnswerCount());

            return questionMyPageDto;
        }).collect(Collectors.toList());


        for (Answer answer :member.getAnswers()) {
            int answerCount = answer.getQuestion().getAnswers().size();
            answer.getQuestion().setAnswerCount(answerCount);
        }

        List<Answer> answerList = member.getAnswers();
        List<AnswerMyPageDto> answerMyPageDtoList = answerList.stream().map(answer ->{
            AnswerMyPageDto answerMyPageDto = new AnswerMyPageDto();
            answerMyPageDto.setAnswerId(answer.getAnswerId());
            answerMyPageDto.setContent(answer.getContent());
            answerMyPageDto.setCreatedAt(answer.getCreatedAt());
            answerMyPageDto.setQuestionId(answer.getQuestion().getQuestionId());
            answerMyPageDto.setTitle(answer.getQuestion().getTitle());
            answerMyPageDto.setVoteCount(answer.getQuestion().getQuestionVoteCount());
            answerMyPageDto.setAnswerCount(answer.getQuestion().getAnswerCount());
            return answerMyPageDto;
        }).collect(Collectors.toList());

        memberMyPageDto.setAnswers(answerMyPageDtoList);

        memberMyPageDto.setQuestions(questionMyPageDtoList);

        return memberMyPageDto;
    }
}
