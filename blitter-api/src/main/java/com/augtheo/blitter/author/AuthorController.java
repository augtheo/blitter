package com.augtheo.blitter.author;

import com.augtheo.blitter.api.RegisterApi;
import com.augtheo.blitter.api.UsersApi;
import com.augtheo.blitter.bleat.Bleat;
import com.augtheo.blitter.bleat.BleatRepository;
import com.augtheo.blitter.favourite.FavouriteService;
import com.augtheo.blitter.model.AuthorRes;
import com.augtheo.blitter.model.BleatRes;
import com.augtheo.blitter.model.RegisterReq;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorController implements UsersApi, RegisterApi {

  private final AuthorService authorService;
  private final FavouriteService favouriteService;

  private final BleatRepository bleatRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  AuthorController(
      AuthorService authorService,
      FavouriteService favouriteService,
      BleatRepository bleatRepository,
      PasswordEncoder passwordEncoder) {
    this.authorService = authorService;
    this.favouriteService = favouriteService;
    this.bleatRepository = bleatRepository;
    this.passwordEncoder = passwordEncoder;
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
  public ResponseEntity<List<BleatRes>> usersUsernameLikedGet(String username) {
    return ResponseEntity.ok(
        favouriteService.getLikedBleats(authorService.getAuthorByUsername(username)).stream()
            .map(this::domainModelConverter)
            .toList());
  }

  private AuthorRes domainModelConverter(Author author) {
    AuthorRes authorRes = new AuthorRes();
    authorRes.setId(author.getId());
    authorRes.setName(author.getName());
    authorRes.setUsername(author.getUsername());
    return authorRes;
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
    return bleatRes;
  }

  @Override
  public ResponseEntity<Void> registerPost(RegisterReq registerReq) {
    Author author =
        new Author(
            registerReq.getUsername(),
            registerReq.getName(),
            passwordEncoder.encode(registerReq.getPassword()));
    authorService.registerAuthor(author);

    return ResponseEntity.ok().build();
  }
}
