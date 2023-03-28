package br.com.nt.ntbank.security;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import br.com.nt.ntbank.model.Conta;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class TokenUtil {
    private static final String HEADER = "Authorization";
    private static final String PREFIX = "Bearer ";
    private static final long EXPIRATION = 12*60*60*1000;
    private static final String SECRET_KEY = "MyK3Yt0T0k3nP4r@S3CuRiTY@Sp3c14L";
    private static final String EMISSOR = "DevNathan";

    public static String createToken(Conta conta){
        Key secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    
        String token = Jwts.builder()
                        .claim("id", conta.getCliente().getId()) // adiciona o ID do usuário ao corpo do token
                        .setSubject(conta.getCliente().getNome())
                        .setIssuer(EMISSOR)
                        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                        .signWith(secretKey, SignatureAlgorithm.HS256)
                        .compact();
    
        return PREFIX + token;
    }
    

    private static Boolean isExpirationValid(Date expiration){
        return expiration.after(new Date(System.currentTimeMillis()));
    }

    private static Boolean isEmissorValid(String emissor){
        return emissor.equals(EMISSOR);
    }

    private static Boolean isSubjectValid(String username){
        return username != null & username.length() > 0;
    }

    public static Authentication validate(HttpServletRequest request) {
        String token = request.getHeader(HEADER);
        token = token.replace(PREFIX, "");
    
        Jws<Claims> jwsClaims = Jwts.parserBuilder().setSigningKey(SECRET_KEY.getBytes())
                                    .build()
                                    .parseClaimsJws(token);
    
        String username = jwsClaims.getBody().getSubject();
        String issuer = jwsClaims.getBody().getIssuer();
        Date expira = jwsClaims.getBody().getExpiration();
        Long userId = jwsClaims.getBody().get("id", Long.class); // extrai o ID do usuário do corpo do token
    
        if (isSubjectValid(username) && isEmissorValid(issuer) && isExpirationValid(expira)) {
            return new UsernamePasswordAuthenticationToken(userId, null, Collections.emptyList()); // retorna o ID do usuário
        }
    
        return null;
    }

    public static Long getUserIdFromToken(String token) {
        token = token.replace(PREFIX, "");
    
        Jws<Claims> jwsClaims = Jwts.parserBuilder().setSigningKey(SECRET_KEY.getBytes())
                                .build()
                                .parseClaimsJws(token);
    
        return jwsClaims.getBody().get("id", Long.class);
    }
}
