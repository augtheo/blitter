package com.augtheo.blitter.author;

import com.augtheo.blitter.api.RegisterApi;
import com.augtheo.blitter.api.UsersApi;
import com.augtheo.blitter.bleat.Bleat;
import com.augtheo.blitter.bleat.BleatRepository;
import com.augtheo.blitter.favourite.LikeService;
import com.augtheo.blitter.model.AuthorRes;
import com.augtheo.blitter.model.BleatRes;
import com.augtheo.blitter.model.PaginatedBleats;
import com.augtheo.blitter.model.RegisterReq;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthorController implements UsersApi, RegisterApi {

  private final AuthorService authorService;
  private final LikeService likeService;

  private final BleatRepository bleatRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  AuthorController(
      AuthorService authorService,
      LikeService likeService,
      BleatRepository bleatRepository,
      PasswordEncoder passwordEncoder) {
    this.authorService = authorService;
    this.likeService = likeService;
    this.bleatRepository = bleatRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public ResponseEntity<Void> createUser(RegisterReq registerReq) {
    Author author =
        new Author(
            registerReq.getUsername(),
            registerReq.getName(),
            passwordEncoder.encode(registerReq.getPassword()));
    authorService.registerAuthor(author);

    return ResponseEntity.ok().build();
  }

  private Author getCurrentLoggedInAuthor() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return authorService.getAuthorByUsername(auth.getName());
  }

  @Override
  public ResponseEntity<AuthorRes> getSelf() {
    return ResponseEntity.ok(domainModelConverter(getCurrentLoggedInAuthor()));
  }

  @Override
  public ResponseEntity<Void> followUser(String username) {

    Author followee = authorService.getAuthorByUsername(username);
    Author follower = getCurrentLoggedInAuthor();
    authorService.followAuthor(followee, follower);
    return ResponseEntity.ok().build();
  }

  // TODO: This should also be a paginated API
  @Override
  public ResponseEntity<List<AuthorRes>> getFollowingUsers(String username) {
    return ResponseEntity.ok(
        authorService.getAuthorByUsername(username).getFollowing().stream()
            .map(this::domainModelConverter)
            .toList());
  }

  @Override
  public ResponseEntity<AuthorRes> getAuthor(String username) {

    return ResponseEntity.ok(domainModelConverter(authorService.getAuthorByUsername(username)));
  }

  @Override
  public ResponseEntity<Void> unfollowUser(String username) {
    Author followee = authorService.getAuthorByUsername(username);
    Author follower = getCurrentLoggedInAuthor();
    authorService.unFollowAuthor(followee, follower);
    return ResponseEntity.ok().build();
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

  private AuthorRes domainModelConverter(Author author) {

    Optional<Author> currentAuthor = getCurrentAuthor();

    return AuthorRes.builder()
        .id(author.getId())
        .name(author.getName())
        .username(author.getUsername())
        .following(
            currentAuthor.map(cAuthor -> cAuthor.getFollowing().contains(author)).orElse(false))
        .follows(
            currentAuthor.map(cAuthor -> cAuthor.getFollowers().contains(author)).orElse(false))
        .followers(author.getFollowers().size())
        .followees(author.getFollowing().size())
        .profileUrl(author.getProfilePictureUri())
        .build();
  }

  private BleatRes domainModelConverter(Bleat bleat) {
    Optional<Author> currentAuthor = getCurrentAuthor();
    return BleatRes.builder()
        .message(bleat.getMessage())
        .authorUsername(bleat.getAuthor().getUsername())
        .authorName(bleat.getAuthor().getName())
        .createdDate(bleat.getCreatedDate())
        .lastModifiedDate(bleat.getLastModifiedDate())
        .id(bleat.getId())
        .likeCount(bleat.getLikeCount())
        .replyCount(bleat.getReplyCount())
        .authorProfileUrl(bleat.getAuthor().getProfilePictureUri())
        .authorLiked(
            currentAuthor.isPresent()
                ? likeService.hasLiked(bleat.getId(), currentAuthor.get().getId())
                : false)
        .build();
  }

  @Override
  public ResponseEntity<PaginatedBleats> getBleatsByAuthor(
      String username, Integer page, Integer perPage) {

    Optional<Author> author = authorService.getOptionalAuthorByUsername(username);
    if (author.isEmpty()) {
      return ResponseEntity.ok(PaginatedBleats.builder().build());
    }
    Page<Bleat> bleatPage =
        bleatRepository.findAllByAuthor(PageRequest.of(page, perPage), author.get());
    PaginatedBleats paginatedBleats =
        PaginatedBleats.builder()
            .bleats(
                bleatPage.getContent().stream()
                    .map(this::domainModelConverter)
                    .map(bleatRes -> bleatRes.authorLiked(false))
                    .toList())
            .page(page)
            .perPage(perPage)
            .totalBleats(bleatPage.getTotalElements())
            .totalPages(bleatPage.getTotalPages())
            .build();
    return ResponseEntity.ok(paginatedBleats);
  }

  @Override
  public ResponseEntity<List<BleatRes>> getBleatsLikedByAuthor(String username) {
    return ResponseEntity.ok(
        likeService.getLikedBleats(authorService.getAuthorByUsername(username)).stream()
            .map(this::domainModelConverter)
            .toList());
  }
}
