package com.augtheo.blitter.bleat;

import com.augtheo.blitter.api.BleatsApi;
import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorService;
import com.augtheo.blitter.favourite.FavouriteService;
import com.augtheo.blitter.model.BleatReq;
import com.augtheo.blitter.model.BleatRes;
import com.augtheo.blitter.model.ToggleLikeBleat200Response;
import com.augtheo.blitter.model.UpdateBleatRequest;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class BleatController implements BleatsApi {

	private final BleatService bleatService;
	private final AuthorService authorService;
	private final FavouriteService favouriteService;

	@Autowired
	public BleatController(BleatService bleatService, AuthorService authorService, FavouriteService favouriteService) {
		this.authorService = authorService;
		this.bleatService = bleatService;
		this.favouriteService = favouriteService;
	}

	@Override
	public ResponseEntity<Void> deleteBleat(String id) {
		try {
			bleatService.deleteBleat(Long.valueOf(id));
			return ResponseEntity.ok().build();
		} catch (Exception ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@Override
	public ResponseEntity<BleatRes> getBleat(Long id) {
		return ResponseEntity.ok(domainModelConverter(bleatService.getBleat(id)));
	}

	@Override
	public ResponseEntity<List<BleatRes>> getBleatReplies(Long id) {
		return ResponseEntity.ok(
				bleatService.getRepliesTo(id).stream().map(this::domainModelConverter).toList()
		);
	}

	@Override
	public ResponseEntity<List<BleatRes>> getBleats() {
		return ResponseEntity.ok(
				bleatService
						.getBleats()
						.stream()
						.map(this::domainModelConverter)
						.map(bleatRes ->
								bleatRes.authorLiked(
										favouriteService.hasLiked(bleatRes.getId() , getCurrentAuthor().getId()
										)
								)
						)
						.toList());
	}


	@Override
	public ResponseEntity<BleatRes> postBleat(BleatReq bleatReq) {
		return ResponseEntity.ok(domainModelConverter(bleatService.postBleat(domainModelConverter(bleatReq))));

	}

	@Override
	public ResponseEntity<BleatRes> replyBleat(Long id, BleatReq bleatReq) {
		return ResponseEntity.ok(domainModelConverter(bleatService.replyBleat(domainModelConverter(bleatReq), id)));
	}

	@Override
	public ResponseEntity<ToggleLikeBleat200Response> toggleLikeBleat(Long id) {
		Pair<Integer , Boolean> likes = favouriteService.toggleLike(id , getCurrentAuthor().getId());
		return ResponseEntity.ok(new ToggleLikeBleat200Response().likeCount(likes.getFirst()).authorLiked(likes.getSecond()));

	}

	@Override
	public ResponseEntity<BleatRes> updateBleat(String id, UpdateBleatRequest updateBleatRequest) {
		try {
			Bleat bleat = bleatService.updateBleat(Long.valueOf(id), updateBleatRequest.getMessage());
			return ResponseEntity.ok(domainModelConverter(bleat));
		} catch (Exception ex) {
			return ResponseEntity.notFound().build();
		}
	}

	private Author getCurrentAuthor() {
		Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long id = token.getClaim("author_id");
		return authorService.getAuthorById(id);
	}

	private BleatRes domainModelConverter(Bleat bleat) {
		BleatRes bleatRes = new BleatRes();
		bleatRes.setMessage(bleat.getMessage());
		bleatRes.setAuthorName(bleat.getAuthor().getName());
		bleatRes.setAuthorUsername(bleat.getAuthor().getUsername());
		bleatRes.setMessage(bleat.getMessage());
		bleatRes.setCreatedDate(bleat.getCreatedDate());
		bleatRes.setLastModifiedDate(bleat.getLastModifiedDate());
		bleatRes.setId(bleat.getId());
		bleatRes.setLikeCount(bleat.getLikeCount());
		bleatRes.setReplyCount(bleat.getReplyCount());
		return bleatRes;
	}

	private Bleat domainModelConverter(BleatReq bleatReq) {
		Bleat bleat = new Bleat();
		bleat.setMessage(bleatReq.getMessage());
		bleat.setAuthor(getCurrentAuthor());
		return bleat;
	}


	private Bleat domainModelConverter(BleatRes bleatRes) {
		Bleat bleat = new Bleat();
		bleat.setAuthor(getCurrentAuthor());
		bleat.setMessage(bleatRes.getMessage());
		return bleat;
	}

}