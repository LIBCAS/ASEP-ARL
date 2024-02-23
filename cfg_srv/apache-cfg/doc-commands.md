# Příkazy 

## Příkazy pro Linux a Apache

### Midnight Commander -  správce souborů
```bash
mc
```

Klávesové zkratky https://cheatography.com/brechtm/cheat-sheets/midnight-commander/pdf/ 

### Spuštění Apache

```bash
systemct start httpd
```
### Zastavení Apache
```bash
systemct stop httpd
```
### Tvrdý restart Apache (Pokud možno nepoužívat)
```bash
systemctl restart httpd
```
### Jemný restart Apache bez zastavení s testem

```bash
systemctl reload httpd
```

### Test konfigurace Apache

```bash
apachectl configtest
```
nebo též
```bash
httpd -t
```

###   Zobrazení logu

```bash
journalctl -xe
```

###  Informace o aktuálním stavu služby Apache

```bash
apachectl status
```

nebo též 

```bash
systemctl status httpd
```
