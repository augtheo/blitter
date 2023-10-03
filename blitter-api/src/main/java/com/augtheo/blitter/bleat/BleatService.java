package com.augtheo.blitter.bleat;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorService;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BleatService {

  private final BleatRepository bleatRepository;
  private final AuthorService authorService;

  @Autowired
  BleatService(BleatRepository bleatRepository, AuthorService authorService) {
    this.bleatRepository = bleatRepository;
    this.authorService = authorService;
  }

  public Page<Bleat> getBleatsFromFollowing(
      Integer page, Integer perPage, Optional<Author> currentAuthor) {
    Pageable pageable = PageRequest.of(page, perPage);

    if (currentAuthor.isPresent()) {
      log.info("current author is present : {}", currentAuthor.get());
      return bleatRepository.findBleatByAuthorInOrderByLastModifiedDateDesc(
          pageable, currentAuthor.get().getFollowing());
    } else {
      log.info("current author is  not present ");
      return Page.empty();
    }
  }

  public Page<Bleat> getBleats(Integer page, Integer perPage) {
    return bleatRepository.findAllByOrderByLastModifiedDateDesc(PageRequest.of(page, perPage));
  }

  public Bleat postBleat(Bleat bleat) {
    return bleatRepository.save(bleat);
  }

  public Bleat replyBleat(Bleat bleat, Long id) {
    Bleat parent = bleatRepository.getReferenceById(id);
    // parent.setReplyCount(parent.getReplyCount() + 1);
    bleatRepository.save(parent);
    bleat.setParent(parent);
    return bleatRepository.save(bleat);
  }

  public boolean hasWriteAccess(Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    log.info("authentication = {} ", authentication);
    Author author = authorService.getAuthorByUsername(authentication.getName());
    return bleatRepository.existsByIdAndAuthor(id, author);
  }

  public Bleat updateBleat(Long id, String message) {
    Optional<Bleat> bleatById = bleatRepository.findBleatById(id);
    if (bleatById.isEmpty()) {
      throw new IllegalStateException("This bleat does not exist");
    } else {
      Bleat bleat = bleatById.get();
      bleat.setMessage(message);
      return bleatRepository.save(bleat);
    }
  }

  public void deleteBleat(Long id) {
    Optional<Bleat> optionalBleat = bleatRepository.findBleatById(id);
    if (optionalBleat.isPresent()) {
      Bleat bleat = optionalBleat.get();
      Bleat parent = bleat.getParent();
      if (parent != null) {
        parent.setReplyCount(parent.getReplyCount() - 1);
        bleatRepository.save(parent);
      }
      bleatRepository.delete(bleat);
    }
  }

  public Optional<Bleat> getBleat(Long id) {
    return Optional.of(bleatRepository.getReferenceById(id));
  }

  public Long getReplyCount(Long id) {
    Optional<Bleat> bleat = getBleat(id);
    if (bleat.isPresent()) return bleatRepository.countByParent(bleat.get());
    else return null;
  }

  public Long getTotal() {
    return bleatRepository.count();
  }
}
