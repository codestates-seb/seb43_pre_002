package pro.stackOverFlow.answer.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.hibernate.annotations.ColumnDefault;
import pro.stackOverFlow.audit.Auditable;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.entity.Question;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column
    private String content;

    @Column
    private String answerSelectionStatus; //답변 채택

    @Column
    @ColumnDefault("0")
    private int voteCount; //답변 vote

    @ManyToOne
    @JoinColumn(name = "question_id")
//    @JsonIgnore  // 무한 참조 순환 방지 annotation
    private Question question;

    @ManyToOne
    @JoinColumn(name = "member_id")
//    @JsonIgnore  // 무한 참조 순환 방지 annotation
    private Member member;


    public void increaseVoteCount() {
        voteCount++;
    }

    public void decreaseVoteCount() {
        voteCount++;
    }

}
