package pro.stackOverFlow.answer.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.hibernate.annotations.ColumnDefault;
import pro.stackOverFlow.audit.Auditable;

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
    private String answerSelectionStatus;

    @Column
    @ColumnDefault("0")
    private int voteCount; //답변 vote



//    @ManyToOne
//    @JoinColumn(name = "question_id")
//    private Question question;
//
//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member member;

    //memberId 랑 questionId는 JoinColumn 하려면 member랑 question이 구현되어야 함


}
