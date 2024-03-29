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
import jakarta.persistence.PostLoad;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Transient;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Bleat {

  @Id
  @SequenceGenerator(name = "bleat_sequence")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bleat_sequence")
  private Long id;

  private String message;

  @ManyToOne(fetch = FetchType.LAZY)
  private Author author;

  @CreatedDate private LocalDateTime createdDate;

  @LastModifiedDate private LocalDateTime lastModifiedDate;

  @ManyToOne(fetch = FetchType.LAZY)
  private Bleat parent;

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "parent")
  @LazyCollection(LazyCollectionOption.EXTRA)
  @Builder.Default
  private Set<Bleat> children = new HashSet<>();

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "bleat")
  @LazyCollection(LazyCollectionOption.EXTRA)
  @Builder.Default
  private Set<Favourite> favourites = new HashSet<>();

  @Transient @Builder.Default private int likeCount = 0;

  @Transient @Builder.Default private int replyCount = 0;

  @PostLoad
  private void loadTransients() {
    if (children != null) {
      replyCount = children.size();
    }
    if (favourites != null) {
      likeCount = favourites.size();
    }
  }

  public Bleat(String message, Author author) {
    this.message = message;
    this.author = author;
  }
}
