package com.augtheo.blitter.favourite;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorRepository;
import com.augtheo.blitter.bleat.Bleat;
import com.augtheo.blitter.bleat.BleatRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

  private final LikeRepository likeRepository;
  private final BleatRepository bleatRepository;
  private final AuthorRepository authorRepository;

  /*
  TODO: Avoid one service using another's repository
   */

  @Autowired
  LikeService(
      LikeRepository likeRepository,
      BleatRepository bleatRepository,
      AuthorRepository authorRepository) {
    this.likeRepository = likeRepository;
    this.bleatRepository = bleatRepository;
    this.authorRepository = authorRepository;
  }

  public Boolean hasLiked(Long bleatId, Long authorId) {
    return likeRepository
        .findByBleatAndAuthor(
            bleatRepository.getReferenceById(bleatId), authorRepository.getReferenceById(authorId))
        .isPresent();
  }

  public Pair<Integer, Boolean> toggleLike(Long bleatId, Long authorId) {

    Optional<Favourite> optionalFavourite =
        likeRepository.findByBleatAndAuthor(
            bleatRepository.getReferenceById(bleatId), authorRepository.getReferenceById(authorId));
    Bleat bleat = bleatRepository.getReferenceById(bleatId);

    if (optionalFavourite.isPresent()) {
      bleat.setLikeCount(bleat.getLikeCount() - 1);
      bleatRepository.save(bleat);
      likeRepository.deleteById(optionalFavourite.get().getId());
    } else {
      bleat.setLikeCount(bleat.getLikeCount() + 1);
      bleatRepository.save(bleat);
      likeRepository.save(new Favourite(bleat, authorRepository.getReferenceById(authorId)));
    }
    return Pair.of(bleat.getLikeCount(), optionalFavourite.isEmpty());
  }

  public List<Bleat> getLikedBleats(Author author) {
    return likeRepository.findAllByAuthor(author).stream().map(Favourite::getBleat).toList();
  }
}
