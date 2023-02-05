package com.augtheo.blitter.author;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorService implements UserDetailsService {

  private final AuthorRepository authorRepository;

  @Autowired
  AuthorService(AuthorRepository authorRepository) {
    this.authorRepository = authorRepository;
  }

  public List<Author> getAuthors() {
    return authorRepository.findAll();
  }

  public Author getAuthorById(Long id) {
    Optional<Author> optionalAuthor = authorRepository.findById(id);
    if (optionalAuthor.isPresent()) {
      return optionalAuthor.get();
    } else {
      throw new IllegalStateException("Author doesn't exist");
    }
  }

  public void registerAuthor(Author author) {
    authorRepository.save(author);
  }

  public void updateAuthorById(Long id, Author author) {
    Optional<Author> optionalAuthor = authorRepository.findById(id);
    if (optionalAuthor.isPresent()) {
      authorRepository.save(author);
    } else {
      throw new IllegalStateException("Author doesn't exist");
    }
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<Author> optionalAuthor = authorRepository.findByNickName(username);
    if (optionalAuthor.isPresent()) {
      return optionalAuthor.get();
    } else {
      throw new UsernameNotFoundException("User with username %s ".formatted(username));
    }
  }

  public Author getAuthorByUsername(String username) {
    Optional<Author> optionalAuthor = authorRepository.findByNickName(username);
    if (optionalAuthor.isPresent()) {
      return optionalAuthor.get();
    } else {
      throw new IllegalStateException("Author with username %s doesn't exist ".formatted(username));
    }
  }
}
