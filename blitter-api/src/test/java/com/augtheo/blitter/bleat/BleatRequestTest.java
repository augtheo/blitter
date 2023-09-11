package com.augtheo.blitter.bleat;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorService;
import com.augtheo.blitter.model.BleatReq;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class BleatRequestTest {

  @Autowired private MockMvc mockMvc;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @MockBean private AuthorService mockAuthorService;

  @MockBean private BleatService mockBleatService;

  private Author author;
  private Bleat bleat;
  private final String USERNAME = "TEST";
  private final String MESSAGE = "Hello World";

  @BeforeEach
  public void init() {
    author = new Author(USERNAME, "Test User", "password");
    bleat = new Bleat(MESSAGE, author);
  }

  @Test
  @DisplayName("Should add a bleat")
  @WithMockUser(username = USERNAME)
  public void shouldAddABleat() throws Exception {
    when(mockBleatService.postBleat(any())).thenReturn(bleat);

    String requestBody =
        objectMapper.writeValueAsString(BleatReq.builder().message(MESSAGE).build());
    mockMvc
        .perform(post("/bleats").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isOk());
  }

  @Test
  @DisplayName("Should get list of bleats")
  @WithMockUser(username = USERNAME)
  public void shouldGetListOfBleats() throws Exception {

    // mock
    when(mockAuthorService.getAuthorByUsername(USERNAME)).thenReturn(author);
    when(mockBleatService.getBleats(any(), any(), any())).thenReturn(mock(Page.class));

    mockMvc.perform(get("/bleats")).andExpect(status().isOk());
  }
}
