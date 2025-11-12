# CS

## Repozitářový systém ASEP/ARL

ASEP/ARL je repozitářový systém, určený pro ukládání vědeckých dat, jehož vývoj koordinuje Knihovna Akademie věd ČR. Datový repozitář ASEP je součástí širšího ekosystému pro evidenci vědeckých výsledků AV ČR.  

Historicky byl ASEP vyvíjený na komerční platformě ARL, poskytované česko-slovenskou firmou Cosmotron. Postupný vývoj vedl nejprve k funkčnosti pro evidenci vědeckých výsledků (publikací, patentů, aplikovaných výsledků,…) kompatibilní s formáty národního CRIS systému RIV, následně k zajištění funkcí repozitáře pro ukládání těchto výsledků a posledním významným rozšířením byla implementace funkcí pro ukládání datasetů. 

V roce 2024 přešel datový repozitář ASEP na současný model vývoje, který propojuje původní část systému ARL poskytnutou firmou Cosmotron jako shareware, s otevřeným zdrojovým kódem pod kterým jsou uvolňovány části týkající se pouze datového repozitáře (to je kód v tomto GitHub repozitáři).  

Celý ekosystém je vhodný např. v  těch případech, kdy je zájem provozovatele o užší propojení vědeckých dat a publikačních výsledků a o možnost vykazování v rámci národního systému pro evidenci a hodnocení vědy.  
Tento Github repozitář obsahuje pouze části vyvinuté v open source režimu. Pokud máte zájem o instanci repozitáře ASEP, [možnosti zprovoznění jsou k dispozici zde](https://github.com/LIBCAS/ASEP-ARL/wiki/Mo%C5%BEnosti-provozov%C3%A1n%C3%AD-repozit%C3%A1%C5%99e-ASEP) 

### Vlastnosti systému ASEP/ARL

* Součást Národní repozitářové platformy  
* Perzistentní identifikátory datových sad DOI a Handle (přidělované přes Datacite)  
* Podpora bohatých metadat (Schema.org)  
* Metadatový popis jednotlivých záznamů vychází ze standardu UNIMARC a je kompatibilní s metadatových schématem Datacite  
* Exporty do JSON, XML a dalších otevřených formátů  
* Neomezená velikost ukládaných souborů  
* Podpora protokolů Z39.50 a OAI-PMH  
* Verzování datových souborů  
* Zaštítění vývoje Knihovnou Akademie věd České republiky

### Další informace

- [Datový repozitář ASEP AV ČR](https://asep.lib.cas.cz/arl-cav/cs/vysledky/?field=ZMDS&term=mdv)  
- [Datový repozitář ASEP AV ČR v databázi Re3Data](https://www.re3data.org/repository/r3d100014032)  
- [Dokumentace ASEP/ARL](https://asep-portal.lib.cas.cz/uvod-do-asep/datovy-repozitar/)

### Kontakt

- Dotazy, podpora: [arl@knav.cz](mailto:arl@knav.cz)   
- Zřízení instance repozitáře, konzultace: [nrp.repozitare@eosc.cz](mailto:nrp.repozitare@eosc.cz), v kopii [arl@knav.cz](mailto:arl@knav.cz) 

# EN

ASEP/ARL is a repository system for storing scientific data. Its development is coordinated by the Library of the Czech Academy of Sciences. ASEP data repository is a part of a broader solution for storing and reporting scientific research results in the Czech Republic. 

The ASEP repository was historically developed on the commercial ARL platform, which is developed by a Czech-Slovak company Cosmotron.   
The first module that was developed was for reporting contextual metadata of scientific outputs (publications, patents, outputs of applied research) into the Czech national CRIS System “RIV”. Later ASEPs functionality was extended to that of an institutional bibliographic repository.   
The latest addition was a module for storing datasets and related metadata \- ASEP Data repository.. 

In 2024, the ASEP data repository transitioned to the current development model - one which connects the original, proprietary part of the ARL system, that is provided by Cosmotron as shareware for the purposes of hosting a data repository (for details, see below), with open source code that contains all the customizations and modules made for ASEP Data Repository. The open source part is the code in this Github repository. 

The ASEP solution is especially useful for cases, when you need to have a deeper connection between scientific publication and the scientific data it was based on, or if you want an easy option for reporting information for the National Evaluation to RIV. 

This Github repository contains only the open source parts of the whole project. For options on how to get your own ASEP instance, see [this page](https://github.com/LIBCAS/ASEP-ARL/wiki/Mo%C5%BEnosti-provozov%C3%A1n%C3%AD-repozit%C3%A1%C5%99e-ASEP). 

### Features of the ASEP Repository system

* Part of the Czech National Repository Platform (NRP)  
* Supports DOI and Handle PIDs  
* Support for rich metadata with Schema.org  
* Metadata are internally stored in a Datacite compatible UNIMARC format  
* Export to JSON, XML, CSV and other commonly used formats  
* No size limit on stored datasets  
* Supports both Z39.50 and  OAI-PMH librarian protocols  
* Dataset versioning  
* Development backed up by the Library of the Czech Academy of Sciences

### Further reading

- [Czech Academy of Sciences instance of the ASEP Repository](https://asep.lib.cas.cz/arl-cav/en/result/?&iset=1)  
- [Re3Data record for the ASEP Repository](https://www.re3data.org/repository/r3d100014032)  
- [ASEP Repository docs](https://asep-portal.lib.cas.cz/basic-information/)

### Contact information

- Questions & support: [arl@lib.cas.cz](mailto:arl@lib.cas.cz)  
- Interested in getting your own ASEP instance? [nrp.repozitare@eosc.cz](mailto:nrp.repozitare@eosc.cz), also CC [arl@lib.cas.cz](mailto:arl@lib.cas.cz) 
