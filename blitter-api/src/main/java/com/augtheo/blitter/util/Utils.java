package com.augtheo.blitter.util;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorService;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

/** Utils */
@Slf4j
public class Utils {

  @Autowired private AuthorService authorService;

  public Optional<Author> getCurrentAuthor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    log.info("authentication = {} ", authentication);
    if (authentication instanceof AnonymousAuthenticationToken) {
      return Optional.empty();
    } else if (authentication instanceof JwtAuthenticationToken) {
      return authorService.getOptionalAuthorByUsername(authentication.getName());
    } else return Optional.empty();
  }
}
