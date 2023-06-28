package com.augtheo.blitter.author;

import com.augtheo.blitter.api.RegisterApi;
import com.augtheo.blitter.api.UsersApi;
import com.augtheo.blitter.bleat.Bleat;
import com.augtheo.blitter.bleat.BleatRepository;
import com.augtheo.blitter.favourite.LikeService;
import com.augtheo.blitter.model.AuthorRes;
import com.augtheo.blitter.model.BleatRes;
import com.augtheo.blitter.model.RegisterReq;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
  public ResponseEntity<List<BleatRes>> usersUsernameBleatsGet(String username) {
    return ResponseEntity.ok(
        bleatRepository.findAllByAuthor(authorService.getAuthorByUsername(username)).stream()
            .map(this::domainModelConverter)
            .toList());
  }

  @Override
  public ResponseEntity<Void> unfollowUser(String username) {
    Author followee = authorService.getAuthorByUsername(username);
    Author follower = getCurrentLoggedInAuthor();
    authorService.unFollowAuthor(followee, follower);
    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<List<BleatRes>> usersUsernameLikedGet(String username) {
    return ResponseEntity.ok(
        likeService.getLikedBleats(authorService.getAuthorByUsername(username)).stream()
            .map(this::domainModelConverter)
            .toList());
  }

  private Author getCurrentAuthor() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Author currentAuthor = authorService.getAuthorByUsername(auth.getName());
    return currentAuthor;
  }

  private AuthorRes domainModelConverter(Author author) {

    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Author currentAuthor = authorService.getAuthorByUsername(auth.getName());

    return AuthorRes.builder()
        .id(author.getId())
        .name(author.getName())
        .username(author.getUsername())
        .following(currentAuthor.getFollowing().contains(author))
        .follows(currentAuthor.getFollowers().contains(author))
        .followers(author.getFollowers().size())
        .followees(author.getFollowing().size())
        .profileUrl(author.getProfilePictureUri())
        .build();
  }

  private BleatRes domainModelConverter(Bleat bleat) {
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
        .authorLiked(likeService.hasLiked(bleat.getId(), getCurrentAuthor().getId()))
        .build();
  }

  // private Author getCurrentAuthor() {
  //   // FIXME Currently using two separate paths
  //   Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
  //   Long id = null;
  //   if (authentication instanceof Jwt) {
  //     Jwt token = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  //     id = token.getClaim("author_id");
  //     return authorService.getAuthorById(id);
  //   } else {
  //     return authorService.getAuthorByUsername(authentication.getName());
  //   }
  // }
}
