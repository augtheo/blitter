package com.augtheo.blitter.bleat;

import com.augtheo.blitter.author.Author;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BleatRepository extends JpaRepository<Bleat, Long> {

  Optional<Bleat> findBleatById(Long id);

  List<Bleat> findAllByOrderByLastModifiedDateDesc();

  List<Bleat> findAllByAuthor(Author author);

  List<Bleat> findAllByParent(Bleat parent);

  Long countByParent(Bleat parent);
}
