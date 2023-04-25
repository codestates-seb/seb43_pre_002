package pro.stackOverFlow.auth.filter;

import lombok.Getter;
import lombok.Setter;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class Decryptor {
    private static final String ALGORITHM = "AES";
    private static final String KEY = "mySecretKey12345";

    public String decryptPassword(String password) throws Exception {
        String encryptedData = password; // 암호화된 데이터
        SecretKeySpec secretKey = new SecretKeySpec(KEY.getBytes(), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        // 암호화된 데이터를 바이트 배열로 변환
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedData);

        // 암호화된 데이터를 복호화
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);

        // 복호화된 데이터를 문자열로 변환
        String decryptedData = new String(decryptedBytes);

        return decryptedData;
    }
}