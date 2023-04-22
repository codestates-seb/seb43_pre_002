package pro.stackOverFlow.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pro.stackOverFlow.audit.Auditable;

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
    private long viewCount; // 조회수

    @Column(nullable = false)
    private long questionVoteCount;


}
