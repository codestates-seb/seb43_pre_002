package pro.stackOverFlow.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    QNA_QUESTION_NOT_FOUND(404, "Q&A Question not found"),
    CANNOT_CHANGE_QNA_QUESTION(403, "Q&A Question can not change");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
