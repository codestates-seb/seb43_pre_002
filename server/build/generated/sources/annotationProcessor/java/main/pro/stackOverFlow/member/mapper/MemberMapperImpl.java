package pro.stackOverFlow.member.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import pro.stackOverFlow.member.dto.MemberDto;
import pro.stackOverFlow.member.entity.Member;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-23T02:45:29+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.email( requestBody.getEmail() );
        member.password( requestBody.getPassword() );
        member.displayName( requestBody.getDisplayName() );

        return member.build();
    }

    @Override
    public Member memberPatchDtoToMember(MemberDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member.MemberBuilder member = Member.builder();

        member.memberId( requestBody.getMemberId() );
        member.displayName( requestBody.getDisplayName() );
        member.title( requestBody.getTitle() );
        member.aboutMe( requestBody.getAboutMe() );
        member.websiteLink( requestBody.getWebsiteLink() );
        member.twitterLink( requestBody.getTwitterLink() );
        member.githubLink( requestBody.getGithubLink() );
        member.notionLink( requestBody.getNotionLink() );
        member.blogLink( requestBody.getBlogLink() );

        return member.build();
    }

    @Override
    public MemberDto.Response memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        long memberId = 0L;
        String email = null;
        String displayName = null;
        String title = null;
        String aboutMe = null;
        String websiteLink = null;
        String twitterLink = null;
        String githubLink = null;
        String notionLink = null;
        String blogLink = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        if ( member.getMemberId() != null ) {
            memberId = member.getMemberId();
        }
        email = member.getEmail();
        displayName = member.getDisplayName();
        title = member.getTitle();
        aboutMe = member.getAboutMe();
        websiteLink = member.getWebsiteLink();
        twitterLink = member.getTwitterLink();
        githubLink = member.getGithubLink();
        notionLink = member.getNotionLink();
        blogLink = member.getBlogLink();
        createdAt = member.getCreatedAt();
        modifiedAt = member.getModifiedAt();

        MemberDto.Response response = new MemberDto.Response( memberId, email, displayName, title, aboutMe, websiteLink, twitterLink, githubLink, notionLink, blogLink, createdAt, modifiedAt );

        return response;
    }

    @Override
    public List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberDto.Response> list = new ArrayList<MemberDto.Response>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponseDto( member ) );
        }

        return list;
    }
}
