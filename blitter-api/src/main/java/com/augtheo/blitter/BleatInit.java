package com.augtheo.blitter;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorRepository;
import com.augtheo.blitter.bleat.Bleat;
import com.augtheo.blitter.bleat.BleatRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
      BleatRepository bleatRepository, AuthorRepository authorRepository) {
    return args -> {
      Author firstAuthor =
          new Author("aug_theo", "Augustine Theodore", passwordEncoder.encode("isthisreallife"));
      Author secondAuthor =
          new Author("nate_drake", "Nathan Drake", passwordEncoder.encode("OrJustAFantasy"));

      authorRepository.saveAll(List.of(firstAuthor, secondAuthor));

      Bleat firstBleat = new Bleat("Hello World", firstAuthor);
      Bleat secondBleat = new Bleat("What's up", secondAuthor);
      bleatRepository.saveAll(List.of(firstBleat, secondBleat));
    };
  }
}
