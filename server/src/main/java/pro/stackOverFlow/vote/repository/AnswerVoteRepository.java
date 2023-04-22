package pro.stackOverFlow.vote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.vote.entity.AnswerVote;

import java.util.Optional;

//public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {
//    Optional<AnswerVote> findByMemberAndAnswer(Member member, Answer answer);
//}
