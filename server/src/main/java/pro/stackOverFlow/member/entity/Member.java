package pro.stackOverFlow.member.entity;

import lombok.*;
import pro.stackOverFlow.audit.Auditable;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String displayName;

    @Column(length = 300)
    private String aboutMe;



//    @ElementCollection(fetch = FetchType.EAGER)
//    private List<String> roles = new ArrayList<>();

//    @Setter(AccessLevel.NONE)
//    @OneToMany(mappedBy = "member")
//    private List<QnaQuestion> qnaQuestions = new ArrayList<>();

    public Member(Long memberId) {
        this.memberId = memberId;
    }


//    public void setQnAQuestion(QnaQuestion qnaQuestion) {
//        this.qnaQuestions.add(qnaQuestion);
//        if (qnaQuestion.getMember() != this) {
//            qnaQuestion.setMember(this);
//        }
//    }


    public static void checkNotFoundMember(Member member) {
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public static void checkExistEmail(Member targetMember) {
        if(targetMember != null)
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }


//    public void checkIsMyself(long authenticatedMemberId) {
//        if (this.memberId != authenticatedMemberId) {
//            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_QNA_QUESTION);
//        }
//    }

//    public boolean isMyself(long authenticatedMemberId) {
//        return this.memberId == authenticatedMemberId;
//    }

//    public boolean isAdmin() {
//        return this.getRoles().contains("ADMIN");
//    }

}
