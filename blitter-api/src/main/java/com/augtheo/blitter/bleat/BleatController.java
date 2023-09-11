package com.augtheo.blitter.bleat;

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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RestController;

/*
 * TODO: Clean up multiple getCurrentAuthor methods
 */
@RestController
@Slf4j
public class BleatController implements BleatsApi {

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
    final var optionalCurrentAuthor = getCurrentAuthor();
    Optional<Bleat> bleat = bleatService.getBleat(id);
    if (bleat.isPresent())
      return ResponseEntity.ok(
          domainModelConverter(bleat.get())
              .authorLiked(
                  optionalCurrentAuthor.isPresent()
                      && likeService.hasLiked(id, optionalCurrentAuthor.get().getId())));
    else return ResponseEntity.notFound().build();
  }

  @Override
  public ResponseEntity<List<BleatRes>> getBleatReplies(Long id) {
    final var currentAuthor = getCurrentAuthor();
    return ResponseEntity.ok(
        bleatService.getRepliesTo(id).stream()
            .map(this::domainModelConverter)
            .map(
                bleatRes ->
                    currentAuthor.isPresent()
                        ? bleatRes.authorLiked(
                            likeService.hasLiked(bleatRes.getId(), currentAuthor.get().getId()))
                        : bleatRes)
            .toList());
  }

  @Override
  public ResponseEntity<PaginatedBleats> getBleats(Integer page, Integer perPage) {
    final var currentAuthor = getCurrentAuthor();
    Page<Bleat> bleatPage = bleatService.getBleats(page, perPage, currentAuthor);
    PaginatedBleats paginatedBleats =
        PaginatedBleats.builder()
            .bleats(
                bleatPage.getContent().stream()
                    .map(this::domainModelConverter)
                    .map(
                        bleatRes ->
                            currentAuthor.isPresent()
                                ? bleatRes.authorLiked(
                                    likeService.hasLiked(
                                        bleatRes.getId(), currentAuthor.get().getId()))
                                : bleatRes)
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
    Pair<Integer, Boolean> likes = likeService.toggleLike(id, getCurrentAuthor().get().getId());
    return ResponseEntity.ok(
        new ToggleLikeBleat200Response()
            .likeCount(likes.getFirst())
            .authorLiked(likes.getSecond()));
  }

  @Override
  @PreAuthorize("@bleatService.hasWriteAccess(#id)")
  public ResponseEntity<BleatRes> updateBleat(Long id, BleatReq bleatReq) {
    try {
      Bleat bleat = bleatService.updateBleat(id, bleatReq.getMessage());
      return ResponseEntity.ok(domainModelConverter(bleat));
    } catch (Exception ex) {
      return ResponseEntity.notFound().build();
    }
  }

  private Optional<Author> getCurrentAuthor() {
    // FIXME: Currently using two separate paths
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    log.info("authentication = {} ", authentication);
    Long id = null;
    if (authentication instanceof Jwt) {
      Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      // id = token.getClaim("author_id");
      log.info("jwt = {} ", token);
      // return authorService.getAuthorById(id);
      // return authorService.getAuthorByUsername(token.getSubject());
      return authorService.getOptionalAuthorByUsername(token.getSubject());
    } else {
      return authorService.getOptionalAuthorByUsername(authentication.getName());
      // return authorService.getAuthorByUsername(authentication.getName());
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
    return Bleat.builder().message(bleatReq.getMessage()).author(getCurrentAuthor().get()).build();
  }

  private Bleat domainModelConverter(BleatRes bleatRes) {
    return Bleat.builder().message(bleatRes.getMessage()).author(getCurrentAuthor().get()).build();
  }
}
