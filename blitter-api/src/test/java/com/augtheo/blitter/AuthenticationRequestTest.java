package com.augtheo.blitter;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthenticationRequestTest {

  @Autowired private MockMvc mockMvc;

  @Test
  public void shouldReturnJwt() throws Exception {

    this.mockMvc
        .perform(
            MockMvcRequestBuilders.post("/auth")
                .with(SecurityMockMvcRequestPostProcessors.httpBasic("aug_theo", "isthisreallife")))
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}
