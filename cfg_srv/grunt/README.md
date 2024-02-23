# Práce s Gruntem v ARL

## Prvotní instalace
- Je vyžadována instalace programu NodeJs [https://nodejs.org/en/download/](https://nodejs.org/en/download/) 
  a instalace Rubby [https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/)
- Do adresáře `DB_subdir` (adresář databáze) vytvoř adresář `grunt` a nakopíruj tam instalační a konfigurační soubory a adresáře Gruntu z SVN adresáře: `\cfg_srv\grunt\`
- Spusti instalační dávku `Install.bat`. Ta nainstaluje potřebné moduly do aktuálního adresáře.

## Struktura adresářů 

- `config` - adresář s externí konfigurací enginů pluginů
- `options` - adresář s externí konfigurací možností pluginů
- `temp` - dočasný adresář pro výstupy, generovanou dokumentaci, vytvořené balíčky.
- `node_modules` - instalované pluginy Nodu

## Instalované pluginy Gruntu

### Systémové

- grunt-cli - Klient Gruntu
- load-grunt-configs - Konfigurace Gruntu
- load-grunt-tasks - Konfigurace úloh Gruntu
- [grunt-prompt](module-prompt.html)
- [grunt-contrib-concat](module-concat.html)
- [grunt-contrib-copy](module-copy.html)
- [grunt-contrib-clean](module-clean.html)
- [grunt-contrib-compress](module-compress.html)
- [grunt-contrib-watch](module-watch.html)
- [grunt-concurrent](module-concurrent.html)
- [grunt-byte-order-mark](module-bom.html)

### SASS/CSS

- [grunt-contrib-sass](module-sass.html)
- [node-sass](module-sass.html)
- [grunt-sass](module-sass.html)
- sass - Kompilace SASSu z příkazové řádky
- [grunt-sassdoc](module-sassdoc.html)
- [grunt-stylelint](module-stylelint.html)
- [stylelint-config-standard](module-stylelint.html)
- [grunt-prettysass](module-prettysass.html)
- [ink-docstrap](module-jsdoc.html)

### JavaScript

- [grunt-jsdoc](module-jsdoc.html)
- [jshint-stylish](module-jsdoc.html)
- [jshint-html-reporter](module-jsdoc.html)
- [grunt-jsbeautifier](module-jsbeautifier.html)
- [grunt-contrib-jshint](module-jshint.html)
- [grunt-contrib-uglify](module-uglify.html)
- [grunt-contrib-requirejs](module-requirejs.html)


## Akce pro I3 aplikace

- V adresáři I3 aplikace spustit - soubor `build.bat`.
- Verze souboru se definuje v souboru `version.js` v adresáři I3 aplikace.
- To co dávka má provést je definováno v souboru v `Gruntfile.js`

