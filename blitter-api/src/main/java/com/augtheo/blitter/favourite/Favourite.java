package com.augtheo.blitter.favourite;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.bleat.Bleat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Favourite {

  @Id
  @SequenceGenerator(name = "like_sequence")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "like_sequence")
  private Long id;

  @ManyToOne private Author author;

  @ManyToOne private Bleat bleat;

  public Favourite(Bleat bleat, Author author) {
    this.bleat = bleat;
    this.author = author;
  }
}
