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
* Flexbox is your new best friend.
* Do not use negative margins.
* When referencing assets use this format: `assets/path/to/img.jpg`. Dot notation like `../../assets/do/not/do/this.jpg` does not play nice with non-root base-href environments.
