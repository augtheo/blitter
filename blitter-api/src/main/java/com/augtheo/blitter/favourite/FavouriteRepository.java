package com.augtheo.blitter.favourite;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.bleat.Bleat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, Long> {

	Optional<Favourite> findByBleatAndAuthor(Bleat bleat, Author author);
	List<Favourite> findAllByAuthor(Author author);
}
