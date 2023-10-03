package com.augtheo.blitter.bleat;

import com.augtheo.blitter.api.BleatsApi;
import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorService;
import com.augtheo.blitter.favourite.LikeService;
import com.augtheo.blitter.model.BleatReq;
import com.augtheo.blitter.model.BleatRes;
import com.augtheo.blitter.model.PaginatedBleats;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
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
  private final BleatRepository bleatRepository;

  @Autowired
  public BleatController(
      BleatService bleatService,
      AuthorService authorService,
      LikeService likeService,
      BleatRepository bleatRepository) {
    this.authorService = authorService;
    this.bleatService = bleatService;
    this.likeService = likeService;
    this.bleatRepository = bleatRepository;
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
  public ResponseEntity<PaginatedBleats> getBleatReplies(Long id, Integer page, Integer perPage) {
    Optional<Bleat> bleat = bleatService.getBleat(id);
    if (bleat.isEmpty()) {
      return ResponseEntity.ok(PaginatedBleats.builder().build());
    }
    final var currentAuthor = getCurrentAuthor();
    Page<Bleat> bleatPage =
        bleatRepository.findAllByParent(PageRequest.of(page, perPage), bleat.get());
    PaginatedBleats paginatedBleats =
        PaginatedBleats.builder()
            .bleats(
                bleatPage.getContent().stream()
                    .map(this::domainModelConverter)
                    .map(
                        bleatRes ->
                            bleatRes.authorLiked(
                                currentAuthor.isPresent()
                                    ? likeService.hasLiked(
                                        bleatRes.getId(), currentAuthor.get().getId())
                                    : false))
                    .toList())
            .page(page)
            .perPage(perPage)
            .totalBleats(bleatPage.getTotalElements())
            .totalPages(bleatPage.getTotalPages())
            .build();
    return ResponseEntity.ok(paginatedBleats);
  }

  @Override
  public ResponseEntity<PaginatedBleats> getBleats(
      Integer page, Integer perPage, Boolean followingOnly) {
    final var currentAuthor = getCurrentAuthor();
    log.info("followingOnly = {} ", followingOnly);
    Page<Bleat> bleatPage =
        followingOnly
            ? bleatService.getBleatsFromFollowing(page, perPage, currentAuthor)
            : bleatService.getBleats(page, perPage);
    PaginatedBleats paginatedBleats =
        PaginatedBleats.builder()
            .bleats(
                bleatPage.getContent().stream()
                    .map(this::domainModelConverter)
                    .map(
                        bleatRes ->
                            bleatRes.authorLiked(
                                currentAuthor.isPresent()
                                    ? likeService.hasLiked(
                                        bleatRes.getId(), currentAuthor.get().getId())
                                    : false))
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
    if (authentication instanceof AnonymousAuthenticationToken) {
      log.info("anonymousAuthentication = {} ", authentication.getClass());
      return Optional.empty();
    } else if (authentication instanceof Jwt) {
      Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      log.info("jwt = {} ", token);
      return authorService.getOptionalAuthorByUsername(token.getSubject());
    } else {
      return authorService.getOptionalAuthorByUsername(authentication.getName());
    }
  }

  private BleatRes domainModelConverter(Bleat bleat) {
    return BleatRes.builder()
        .authorName(bleat.getAuthor().getName())
        .authorProfileUrl(bleat.getAuthor().getProfilePictureUri())
        .authorUsername(bleat.getAuthor().getUsername())
        .createdDate(bleat.getCreatedDate())
        .id(bleat.getId())
        .lastModifiedDate(bleat.getLastModifiedDate())
        .likeCount(bleat.getLikeCount())
        .message(bleat.getMessage())
        .message(bleat.getMessage())
        .replyCount(bleat.getReplyCount())
        .build();
  }

  private Bleat domainModelConverter(BleatReq bleatReq) {
    return Bleat.builder().message(bleatReq.getMessage()).author(getCurrentAuthor().get()).build();
  }

  private Bleat domainModelConverter(BleatRes bleatRes) {
    return Bleat.builder().message(bleatRes.getMessage()).author(getCurrentAuthor().get()).build();
  }

  @Override
  public ResponseEntity<Void> toggleLikeBleat(Long id) {
    likeService.toggleLike(id, getCurrentAuthor().get().getId());
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Void> likeBleat(Long id) {
    // likeService.like(id, getCurrentAuthor().get().getId());
    likeService.addLike(id, getCurrentAuthor().get().getId());
    return ResponseEntity.ok().build();
    // throw new UnsupportedOperationException("Unimplemented method 'likeBleat'");
  }

  @Override
  public ResponseEntity<Void> unlikeBleat(Long id) {
    // TODO Auto-generated method stub
    likeService.addLike(id, getCurrentAuthor().get().getId());
    return ResponseEntity.ok().build();
    // throw new UnsupportedOperationException("Unimplemented method 'unlikeBleat'");
  }
}
