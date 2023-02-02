package com.augtheo.blitter.favourite;

import com.augtheo.blitter.author.Author;
import jakarta.transaction.Transactional;
import com.augtheo.blitter.author.AuthorRepository;
import com.augtheo.blitter.bleat.Bleat;
import com.augtheo.blitter.bleat.BleatRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FavouriteService {

	private final FavouriteRepository favouriteRepository;
	private final BleatRepository bleatRepository;
	private final AuthorRepository authorRepository;

	/*
	TODO: Avoid one service using another's repository
	 */

	@Autowired
	FavouriteService(FavouriteRepository favouriteRepository, BleatRepository bleatRepository, AuthorRepository authorRepository) {
		this.favouriteRepository = favouriteRepository;
		this.bleatRepository = bleatRepository;
		this.authorRepository = authorRepository;
	}

	public Boolean hasLiked(Long bleatId , Long authorId) {
		return favouriteRepository.findByBleatAndAuthor(
				bleatRepository.getReferenceById(bleatId),
				authorRepository.getReferenceById(authorId)
		).isPresent();
	}


	public Pair<Integer,  Boolean> toggleLike(Long bleatId, Long authorId) {

		Optional<Favourite> optionalFavourite = favouriteRepository.findByBleatAndAuthor(bleatRepository.getReferenceById(bleatId) , authorRepository.getReferenceById(authorId));
		Bleat bleat = bleatRepository.getReferenceById(bleatId);

		if(optionalFavourite.isPresent()) {
			bleat.setLikeCount(bleat.getLikeCount() - 1);
			bleatRepository.save(bleat);
			favouriteRepository.deleteById(optionalFavourite.get().getId());
		} else {
			bleat.setLikeCount(bleat.getLikeCount() + 1);
			bleatRepository.save(bleat);
			favouriteRepository.save(new Favourite(bleat , authorRepository.getReferenceById(authorId)));
		}
		return Pair.of( bleat.getLikeCount(), optionalFavourite.isEmpty());
	}

	public List<Bleat> getLikedBleats(Author author) {
		return favouriteRepository.findAllByAuthor(author).stream().map(Favourite::getBleat).toList();
	}
}
