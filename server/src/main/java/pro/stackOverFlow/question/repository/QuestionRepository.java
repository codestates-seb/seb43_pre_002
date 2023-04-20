package pro.stackOverFlow.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pro.stackOverFlow.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
