package com.augtheo.blitter.favourite;

import com.augtheo.blitter.bleat.Bleat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.augtheo.blitter.author.Author;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Favourite {

	@Id
	@SequenceGenerator(name = "like_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE  , generator = "like_sequence")
	Long id;

	@OneToOne
	Author author;

	@OneToOne
	Bleat bleat;

	public Favourite(Bleat bleat, Author author) {
		this.bleat  = bleat;
		this.author = author;
	}
}
