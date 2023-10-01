package com.augtheo.blitter.author;

import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthorService implements UserDetailsService {

  private final AuthorRepository authorRepository;

  @Autowired
  AuthorService(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }

  public Author getAuthorById(Long id) {
    return authorRepository.findById(id).orElseThrow(AuthorNotFoundException::new);
  }

  public void registerAuthor(Author author) {
    authorRepository.save(author);
  }

  // TODO: Consider only specific fields that require update
  // public void updateAuthorById(Long id, Author author) {
  //   Optional<Author> optionalAuthor = authorRepository.findById(id);
  //   if (optionalAuthor.isPresent()) {
  //     authorRepository.save(author);
  //   } else {
  //     throw new IllegalStateException("Author doesn't exist");
  //   }
  // }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return authorRepository
        .findByUsername(username)
        .orElseThrow(
            () -> new UsernameNotFoundException("User with username " + username + " not found"));
  }

  public Optional<Author> getOptionalAuthorByUsername(String username) {
    return authorRepository.findByUsername(username);
  }

  public Author getAuthorByUsername(String username) {
    log.info("username={}", username);
    return authorRepository.findByUsername(username).orElseThrow(AuthorNotFoundException::new);
  }

  public void unFollowAuthor(Author followee, Author follower) {
    if (follower.getFollowing().contains(followee)) {
      follower.getFollowing().remove(followee);
      followee.getFollowers().remove(follower);
      authorRepository.saveAll(List.of(followee, follower));
    }
  }

  public void followAuthor(Author followee, Author follower) {
    if (!follower.getFollowing().contains(followee)) {
      follower.getFollowing().add(followee);
      followee.getFollowers().add(follower);
      authorRepository.saveAll(List.of(followee, follower));
    }
  }
}
