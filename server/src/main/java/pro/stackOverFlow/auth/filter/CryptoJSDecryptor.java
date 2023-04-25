package pro.stackOverFlow.auth.filter;

import org.springframework.context.annotation.Bean;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


public class CryptoJSDecryptor {
    public String decrypt(String ciphertext, String key) throws ScriptException {
        String decryptedText;

        ScriptEngineManager factory = new ScriptEngineManager();
        ScriptEngine engine = factory.getEngineByName("JavaScript");
        engine.eval("var ciphertext = '" + ciphertext + "';");
        engine.eval("var key = '" + key + "';");
        engine.eval("var plaintext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);");
        decryptedText = engine.get("plaintext").toString();

        return decryptedText;
    }
}