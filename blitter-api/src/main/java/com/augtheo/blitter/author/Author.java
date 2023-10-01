package com.augtheo.blitter.author;

import jakarta.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Author implements UserDetails {

  @Id
  @SequenceGenerator(name = "author_sequence")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_sequence")
  private Long id;

  @ToString.Exclude private String password;

  private String name;

  private String username;

  private boolean accountExpired = false;

  private boolean accountLocked = false;

  private boolean credentialsExpired = false;

  private boolean enabled = true;

  private String profilePictureUri;

  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @ManyToMany
  @JoinTable(
      name = "follower_following",
      joinColumns = @JoinColumn(name = "follower"),
      inverseJoinColumns = @JoinColumn(name = "following"))
  private @Singular Set<Author> followers = new HashSet<>();

  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @ManyToMany(mappedBy = "followers")
  private @Singular Set<Author> following = new HashSet<>();

  public Author(String username, String name, String password) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.followers.add(this);
    this.following.add(this);
    this.profilePictureUri = String.format("https://robohash.org/%s.png", this.username);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.emptyList();
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return !accountExpired;
  }

  @Override
  public boolean isAccountNonLocked() {
    return !accountLocked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return !credentialsExpired;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  public void addFollower(Author follower) {
    this.followers.add(follower);
  }

  public void addFollowing(Author following) {
    this.following.add(following);
  }
}
