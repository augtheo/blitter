package com.augtheo.blitter.bleat;

import com.augtheo.blitter.api.AllApi;
import com.augtheo.blitter.api.BleatsApi;
import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorService;
import com.augtheo.blitter.favourite.LikeService;
import com.augtheo.blitter.model.BleatReq;
import com.augtheo.blitter.model.BleatRes;
import com.augtheo.blitter.model.PaginatedBleats;
import com.augtheo.blitter.model.ToggleLikeBleat200Response;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RestController;

/*
 * TODO: Clean up multiple getCurrentAuthor methods
 */
@RestController
@Slf4j
public class BleatController implements BleatsApi, AllApi {

  private final BleatService bleatService;
  private final AuthorService authorService;
  private final LikeService likeService;

  @Autowired
  public BleatController(
      BleatService bleatService, AuthorService authorService, LikeService likeService) {
    this.authorService = authorService;
    this.bleatService = bleatService;
    this.likeService = likeService;
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

    Optional<Bleat> bleat = bleatService.getBleat(id);
    if (bleat.isPresent())
      return ResponseEntity.ok(
          domainModelConverter(bleat.get())
              .authorLiked(likeService.hasLiked(id, getCurrentAuthor().getId())));
    else return ResponseEntity.notFound().build();
  }

  @Override
  public ResponseEntity<List<BleatRes>> getBleatReplies(Long id) {
    return ResponseEntity.ok(
        bleatService.getRepliesTo(id).stream()
            .map(this::domainModelConverter)
            .map(
                bleatRes ->
                    bleatRes.authorLiked(
                        likeService.hasLiked(bleatRes.getId(), getCurrentAuthor().getId())))
            .toList());
  }

  @Override
  public ResponseEntity<PaginatedBleats> getBleatsAll(
      Integer page, Integer perPage, String feedType) {
    Page<Bleat> bleatPage = bleatService.getBleats(page, perPage, Optional.empty());
    PaginatedBleats paginatedBleats =
        PaginatedBleats.builder()
            .bleats(bleatPage.getContent().stream().map(this::domainModelConverter).toList())
            .page(page)
            .perPage(perPage)
            .totalBleats(bleatPage.getTotalElements())
            .totalPages(bleatPage.getTotalPages())
            .build();
    log.info("Response : {} ", paginatedBleats);
    return ResponseEntity.ok(paginatedBleats);
  }

  @Override
  public ResponseEntity<PaginatedBleats> getBleats(Integer page, Integer perPage, String feedType) {
    Page<Bleat> bleatPage =
        switch (feedType) {
          case "feed" -> bleatService.getBleats(page, perPage, Optional.empty());
          default -> bleatService.getBleats(page, perPage, Optional.of(getCurrentAuthor()));
        };
    PaginatedBleats paginatedBleats =
        PaginatedBleats.builder()
            .bleats(
                bleatPage.getContent().stream()
                    .map(this::domainModelConverter)
                    .map(
                        bleatRes ->
                            bleatRes.authorLiked(
                                likeService.hasLiked(bleatRes.getId(), getCurrentAuthor().getId())))
                    .toList())
            .page(page)
            .perPage(perPage)
            .totalBleats(bleatPage.getTotalElements())
            .totalPages(bleatPage.getTotalPages())
            .build();
    log.info("Response : {} ", paginatedBleats);
    return ResponseEntity.ok(paginatedBleats);
  }

  @Override
  public ResponseEntity<BleatRes> postBleat(BleatReq bleatReq) {
    return ResponseEntity.ok(
        domainModelConverter(bleatService.postBleat(domainModelConverter(bleatReq))));
  }

  @Override
  public ResponseEntity<BleatRes> replyBleat(Long id, BleatReq bleatReq) {
    return ResponseEntity.ok(
        domainModelConverter(bleatService.replyBleat(domainModelConverter(bleatReq), id)));
  }

  @Override
  public ResponseEntity<ToggleLikeBleat200Response> toggleLikeBleat(Long id) {
    Pair<Integer, Boolean> likes = likeService.toggleLike(id, getCurrentAuthor().getId());
    return ResponseEntity.ok(
        new ToggleLikeBleat200Response()
            .likeCount(likes.getFirst())
            .authorLiked(likes.getSecond()));
  }

  @Override
  public ResponseEntity<BleatRes> updateBleat(Long id, BleatReq bleatReq) {
    try {
      Bleat bleat = bleatService.updateBleat(id, bleatReq.getMessage());
      return ResponseEntity.ok(domainModelConverter(bleat));
    } catch (Exception ex) {
      return ResponseEntity.notFound().build();
    }
  }

  private Author getCurrentAuthor() {
    // FIXME Currently using two separate paths
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Long id = null;
    if (authentication instanceof Jwt) {
      Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      id = token.getClaim("author_id");
      return authorService.getAuthorById(id);
    } else {
      return authorService.getAuthorByUsername(authentication.getName());
    }
  }

  private BleatRes domainModelConverter(Bleat bleat) {
    return BleatRes.builder()
        .message(bleat.getMessage())
        .authorName(bleat.getAuthor().getName())
        .authorUsername(bleat.getAuthor().getUsername())
        .authorProfileUrl(bleat.getAuthor().getProfilePictureUri())
        .message(bleat.getMessage())
        .createdDate(bleat.getCreatedDate())
        .lastModifiedDate(bleat.getLastModifiedDate())
        .id(bleat.getId())
        .likeCount(bleat.getLikeCount())
        .replyCount(bleat.getReplyCount())
        .build();
  }

  private Bleat domainModelConverter(BleatReq bleatReq) {
    return Bleat.builder().message(bleatReq.getMessage()).author(getCurrentAuthor()).build();
  }

  private Bleat domainModelConverter(BleatRes bleatRes) {
    return Bleat.builder().message(bleatRes.getMessage()).author(getCurrentAuthor()).build();
  }
}
