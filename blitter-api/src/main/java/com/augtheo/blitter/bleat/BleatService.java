package com.augtheo.blitter.bleat;

import com.augtheo.blitter.author.Author;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BleatService {

  private final BleatRepository bleatRepository;

  @Autowired
  BleatService(BleatRepository bleatRepository) {
    this.bleatRepository = bleatRepository;
  }

  public Page<Bleat> getBleats(Integer page, Integer perPage, Author currentAuthor) {
    Pageable pageable = PageRequest.of(page, perPage);
    return bleatRepository.findBleatByAuthorInOrderByLastModifiedDateDesc(
        pageable, currentAuthor.getFollowing());
  }

  public Bleat postBleat(Bleat bleat) {
    return bleatRepository.save(bleat);
  }

  public Bleat replyBleat(Bleat bleat, Long id) {
    Bleat parent = bleatRepository.getReferenceById(id);
    parent.setReplyCount(parent.getReplyCount() + 1);
    bleatRepository.save(parent);
    bleat.setParent(parent);
    return bleatRepository.save(bleat);
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

  public Bleat getBleat(Long id) {
    return bleatRepository.getReferenceById(id);
  }

  public List<Bleat> getRepliesTo(Long id) {
    Bleat bleat = getBleat(id);
    return bleatRepository.findAllByParent(bleat);
  }

  public Long getReplyCount(Long id) {
    Bleat bleat = getBleat(id);
    return bleatRepository.countByParent(bleat);
  }

  public Long getTotal() {
    return bleatRepository.count();
  }
}
