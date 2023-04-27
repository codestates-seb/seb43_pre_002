package pro.stackOverFlow.member.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import pro.stackOverFlow.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> { // 수정된 부분
    //    Member findByMemberId(long memberId);
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
}
