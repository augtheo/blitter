package com.augtheo.blitter.auth;

import com.augtheo.blitter.author.Author;
import java.time.Instant;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

  private final JwtEncoder jwtEncoder;

  @Autowired
  AuthenticationController(JwtEncoder jwtEncoder) {
    this.jwtEncoder = jwtEncoder;
  }

  @PostMapping("/auth")
  public Map<String, String> login(Authentication authentication) {
    Instant now = Instant.now();
    long expiry = 60 * 60;

    String scope =
        authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));

    Author author = (Author) authentication.getPrincipal();

    JwtClaimsSet claims =
        JwtClaimsSet.builder()
            .issuer("self")
            .issuedAt(now)
            .expiresAt(now.plusSeconds(expiry))
            .subject(authentication.getName())
            .claim("scope", scope)
            .claim("author_id", author.getId())
            .build();

    return Map.of("jwt", this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue());
  }
}
