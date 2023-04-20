package pro.stackOverFlow.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pro.stackOverFlow.audit.Auditable;
import pro.stackOverFlow.member.entity.Member;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int viewCount; // 조회수

    @ManyToOne(targetEntity = Member.class, cascade = CascadeType.PERSIST)
    @Setter
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
        if (!member.getQuestions().contains(this)) {
            member.getQuestions().add(this);
        }
    }

}
