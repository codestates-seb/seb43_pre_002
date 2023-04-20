package pro.stackOverFlow.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.stackOverFlow.answer.entity.AnswerVote;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {
}
