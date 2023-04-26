package pro.stackOverFlow.audit;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

//    @LastModifiedDate
//    @Column(name = "LAST_MODIFIED_AT")
//    private LocalDateTime modifiedAt;


//    @LastModifiedDate -> 데이터가 수정되면 자동으로 날짜가 업데이트 된다 -> 그러나 상세 질문 페이지 이동시 조회수가 없데이트 된다
//    -> 상세 페이지 이동시 조회수가 올라가며 수정 날짜가 바뀜 -> 이 구현 오류사항을 막기 위해 이 어노데이션은 사용 하지 않는다.
    @Getter
    @Setter
    @Column(name = "last_modified_at")
    protected LocalDateTime modifiedAt = LocalDateTime.now();

}