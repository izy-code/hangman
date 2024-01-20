Deploy: [link](https://izy-code.github.io/hangman/hangman/)

![rolling-scopes-school github io_izy-code-JSFE2023Q4_hangman_](https://github.com/rolling-scopes-school/izy-code-JSFE2023Q4/assets/126877709/148e67a3-5ef5-456e-be8a-978d3e48e99c)

Task: [link](https://github.com/rolling-scopes-school/tasks/tree/master/stage1/tasks/hangman)

  - [x]  Responsive UI from 1440px to 360px viewport
  - [x]  The generation of DOM elements is implemented. Body element in the index.html is empty.
  - [x]  The game starts with the correct default view (empty gallows, underscores for secret word, etc.) and a random question
  - [x]  The user can play the game by using the virtual keyboard
  - [x]  The user can play the game by using the physical keyboard
  - [x]  When the letter is correct, it appears instead of the corresponding underscore. If the letter repeats in the word, all corresponding underscores must be replaced by it

    When the letter is incorrect:
      - [x]  the incorrect guesses counter is updated
      - [x]  a body part is added to the gallows
  - [x]  The clicked/pressed letter is disabled
  - [x]  The body parts appear on the gallows in the logical order (head, body, left arm, right arm, left leg, right leg)
  - [x]  When the user runs out of 6 attempts or wins the game, the modal window appears
  - [x]  The modal window includes the message about the game's outcome (winning or losing), the secret word and the 'play again' button
  - [x]  When the user clicks the 'play again' button, the game starts over by showing a new question and resetting the gallows, the incorrect guesses counter and the underscores for the secret word
