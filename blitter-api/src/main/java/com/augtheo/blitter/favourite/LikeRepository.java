package com.augtheo.blitter.favourite;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.bleat.Bleat;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Favourite, Long> {

  Optional<Favourite> findByBleatAndAuthor(Bleat bleat, Author author);

  List<Favourite> findAllByAuthor(Author author);
}
