package com.augtheo.blitter.bleat;

import com.augtheo.blitter.author.Author;
import com.augtheo.blitter.author.AuthorService;
import com.augtheo.blitter.model.BleatReq;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test") // TODO: Avoid repeating ActiveProfiles annotation
public class BleatRequestTest {

  @Autowired private MockMvc mockMvc;

  private final ObjectMapper objectMapper = new ObjectMapper();

  @MockBean private AuthorService mockAuthorService;

  @MockBean private BleatService mockBleatService;

  private Author author = new Author("Test42", "Test User", "TESTpassword123");
  private Bleat bleat = new Bleat("Hello World", author);

  @BeforeAll
  public void init() {
    Mockito.when(mockAuthorService.getAuthorByUsername("Test42")).thenReturn(author);
    Mockito.when(mockBleatService.postBleat(Mockito.any())).thenReturn(bleat);
  }

  @Test
  @WithMockUser
  public void shouldAddABleat() throws Exception {

    BleatReq bleatReq = new BleatReq();
    bleatReq.setMessage("Hello World");
    String requestBody = objectMapper.writeValueAsString(bleatReq);

    this.mockMvc
        .perform(
            MockMvcRequestBuilders.post("/bleats")
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .with(SecurityMockMvcRequestPostProcessors.user(author))
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  @WithMockUser
  public void shouldGetListOfBleats() throws Exception {
    this.mockMvc
        .perform(MockMvcRequestBuilders.get("/bleats"))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}
