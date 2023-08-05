package com.augtheo.blitter.bleat;

import com.augtheo.blitter.author.Author;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BleatRepository extends JpaRepository<Bleat, Long> {

  Optional<Bleat> findBleatById(Long id);

  Page<Bleat> findBleatByAuthorInOrderByLastModifiedDateDesc(
      Pageable pageable, Collection<Author> authors);

  Page<Bleat> findAllByOrderByLastModifiedDateDesc(Pageable pageable);

  List<Bleat> findAllByAuthor(Author author);

  List<Bleat> findAllByParent(Bleat parent);

  Boolean existsByIdAndAuthor(Long id, Author author);

  Long countByParent(Bleat parent);
}
