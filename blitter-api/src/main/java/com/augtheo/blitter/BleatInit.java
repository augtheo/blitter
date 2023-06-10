package com.augtheo.blitter;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorRepository;
import com.augtheo.blitter.author.AuthorService;
import com.augtheo.blitter.bleat.Bleat;
import com.augtheo.blitter.bleat.BleatRepository;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BleatInit {

  PasswordEncoder passwordEncoder;

  @Autowired
  BleatInit(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @Bean
  CommandLineRunner commandLineRunner(
      BleatRepository bleatRepository,
      AuthorRepository authorRepository,
      AuthorService authorservice) {
    return args -> {
      Author firstAuthor =
          new Author("aug_theo", "Augustine Theodore", passwordEncoder.encode("isthisreallife"));
      Author secondAuthor =
          new Author("nate_drake", "Nathan Drake", passwordEncoder.encode("OrJustAFantasy"));

      firstAuthor.setProfilePictureUri(
          "https://blitter-user-profile-pictures.s3.amazonaws.com/boy.jpg");
      secondAuthor.setProfilePictureUri(
          "https://blitter-user-profile-pictures.s3.amazonaws.com/girl.jpg");

      // secondAuthor follows firstAuthor;              
      firstAuthor.addFollower(secondAuthor);
      secondAuthor.addFollowing(firstAuthor);

      authorRepository.saveAll(List.of(firstAuthor, secondAuthor));

      List<Bleat> testBleatList = new LinkedList<>();
      for (int i = 0; i < 20; i++) {
        testBleatList.add(
            new Bleat(
                String.format("Hey this is %d", i), (i % 2 == 0 ? firstAuthor : secondAuthor)));
      }

      bleatRepository.saveAll(testBleatList);

      System.out.println("first Author " + firstAuthor);
      System.out.println("second Author " + secondAuthor);

      Page<Bleat> allBleats =
          bleatRepository.findAllByOrderByLastModifiedDateDesc(PageRequest.of(0, 30));
      System.out.println("all Bleats = " + allBleats);
    };
  }
}
