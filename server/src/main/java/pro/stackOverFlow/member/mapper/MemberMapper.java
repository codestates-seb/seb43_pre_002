package pro.stackOverFlow.member.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Service;
import pro.stackOverFlow.member.dto.MemberDto;
import pro.stackOverFlow.member.entity.Member;

import java.util.List;

@Service
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);

    Member memberPatchDtoToMember(MemberDto.Patch requestBody);


    MemberDto.Response memberToMemberResponseDto(Member member);
    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);
}
