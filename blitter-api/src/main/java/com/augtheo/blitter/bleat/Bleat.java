package com.augtheo.blitter.bleat;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.favourite.Favourite;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Bleat {

  @Id
  @SequenceGenerator(name = "bleat_sequence")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bleat_sequence")
  Long id;

  String message;

  @ManyToOne(fetch = FetchType.LAZY)
  Author author;

  @CreatedDate LocalDateTime createdDate;
  @LastModifiedDate LocalDateTime lastModifiedDate;
  int likeCount;

  /*
  TODO: May need a separate Replies table
   */
  @ManyToOne(fetch = FetchType.LAZY)
  Bleat parent;

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "parent")
  List<Bleat> children;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "bleat")
  List<Favourite> favourites;

  int replyCount;

  public Bleat(String message, Author author) {
    this.message = message;
    this.author = author;
    this.likeCount = 0;
  }
}
