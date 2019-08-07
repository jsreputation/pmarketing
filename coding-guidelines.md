# Coding Guidelines

Please familiarise yourself with <https://angular.io/guide/styleguide>

## CSS
*   This will set `1rem` = `10px`. Use `rem` in your code to size fonts and other things font-size related.
    ```css
    // styles.css
    html {
        font-size: 62.5%;
    }
    ```
* [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is your new best friend.
* Do not use negative margins.
* When referencing assets use this format: `assets/path/to/img.jpg`. Dot notation like `../../assets/do/not/do/this.jpg` does not play nice with non-root base-href environments.
* a good explanation of why you should not use 100vh on mobile [https://stackoverflow.com/a/37113430](https://stackoverflow.com/a/37113430)
  > This is completely intentional. It took quite a bit of work on our part to achieve this effect. :)  
  The base problem is this: the visible area changes dynamically as you scroll. If we update the CSS viewport height accordingly, we need to update the layout during the scroll. Not only that looks like shit, but doing that at 60 FPS is practically impossible in most pages (60 FPS is the baseline framerate on iOS).  
  It is hard to show you the “looks like shit” part, but imagine as you scroll, the contents moves and what you want on screen is continuously shifting.  
  Dynamically updating the height was not working, we had a few choices: drop viewport units on iOS, match the document size like before iOS 8, use the small view size, use the large view size.  
  From the data we had, using the larger view size was the best compromise. Most website using viewport units were looking great most of the time.
