package pro.stackOverFlow.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.stackOverFlow.answer.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
