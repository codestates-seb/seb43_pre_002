package pro.stackOverFlow.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.question.entity.QuestionVote;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    Optional<QuestionVote> findByMemberAndQuestion(Member member, Question question);
}
