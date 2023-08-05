package com.augtheo.blitter;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthenticationRequestTest {

  @Autowired private MockMvc mockMvc;

  @Test
  @WithMockUser(username = "user")
  public void whenAuthenticatedThen200() throws Exception {
    this.mockMvc
        .perform(post("/auth").with(httpBasic("user", "password")))
        .andExpect(status().isOk());
  }

  @Test
  void whenBadCredentialsThen401() throws Exception {
    this.mockMvc.perform(post("/auth")).andExpect(status().isUnauthorized());
  }
}
