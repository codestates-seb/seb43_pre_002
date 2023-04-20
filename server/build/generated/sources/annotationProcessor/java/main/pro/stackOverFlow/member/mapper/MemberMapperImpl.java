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
    date = "2023-04-21T06:27:19+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );
        member.setDisplayName( requestBody.getDisplayName() );

        return member;
    }

    @Override
    public Member memberPatchDtoToMember(MemberDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( requestBody.getMemberId() );
        member.setDisplayName( requestBody.getDisplayName() );
        member.setTitle( requestBody.getTitle() );
        member.setAboutMe( requestBody.getAboutMe() );
        member.setWebsiteLink( requestBody.getWebsiteLink() );
        member.setTwitterLink( requestBody.getTwitterLink() );
        member.setGithubLink( requestBody.getGithubLink() );
        member.setNotionLink( requestBody.getNotionLink() );
        member.setBlogLink( requestBody.getBlogLink() );

        return member;
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
