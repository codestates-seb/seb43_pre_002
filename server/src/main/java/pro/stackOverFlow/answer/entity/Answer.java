package pro.stackOverFlow.answer.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.aspectj.weaver.patterns.TypePatternQuestions;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import pro.stackOverFlow.audit.Auditable;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.entity.Question;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column
    private String content;

    @Column
    private boolean accepted; //답변 채택

    @Column
    @ColumnDefault("0")
    private Long voteCount; //답변 vote


    @ElementCollection
    public List<Long> upVotedUserId = new ArrayList<>();

    @ElementCollection
    public List<Long> downVotedUserId = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


    public void setVoteCount(long voteCount) {
        this.voteCount = voteCount;
    }

    public void addMember(Member member) {
        this.member = member;
        if (!member.getAnswers().contains(this)) {
            member.getAnswers().add(this);
        }
    }

}
