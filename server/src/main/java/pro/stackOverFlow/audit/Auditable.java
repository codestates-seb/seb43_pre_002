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
import java.time.ZoneId;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {
    
    ZoneId seoulZoneId = ZoneId.of("Asia/Seoul");

    @Getter
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(seoulZoneId);

    @Getter
    @Setter
    @Column(name = "last_modified_at")
    protected LocalDateTime modifiedAt = LocalDateTime.now(seoulZoneId);

}
