/**
 * Lokalizacia
 * Slovencina#Cestina#Anglictina
 *
 * 07.01.21 on; vymaz zaznamu
 * 13.02.20 on; oprava preklepu
 * 12.02.20 on; txFormIdEmpty a txErrorGetForm
 * 23.01.20 on; txErrorSortingRecord
 * 08.09.17 on; uprava hlasky
 * 21.12.16 on; zmena id
 * 28.11.16 on; datumove validace
 * 12.12.14 on; nove texty
 */
/*global Ext, epca */
Ext.ns('epca');
epca.L10n = {
    titleProperties: 'Vlastnosti#Vlastnosti#Properties'.ls(),
    titleSourceCode: 'Zdrojový kód#Zdrojový kód#Source code'.ls(),
    titleRunSourceCode: 'Spustiť kód#Spustit kód#Run code'.ls(),
    titleValidateSourceCode: 'Validovať kód#Validovat kód#Validate code'.ls(),
    titleSaveSourceCode: 'Uložiť kód#Uložit kód#Save code'.ls(),
    titleNew: 'Nový#Nový#New'.ls(),
    titleNewAuthority: 'Pridať autoritu#Přidat autoritu#Add authority'.ls(),
    titleOpen: 'Otvoriť#Otevřít#Open'.ls(),
    titleCreate: 'Vytvoriť#Vytvořit#Create'.ls(),
    titleClose: 'Zatvoriť#Zavřít#Close'.ls(),
    titleSave: 'Uložiť#Uložit#Save'.ls(),
    titleSaveAs: 'Uložiť ako#Uložit jako#Save as'.ls(),
    titleDelete: 'Vymazať#Vymazat#Delete'.ls(),
    titleFormPreview: 'Náhľad formulára#Náhled formuláře#Form preview'.ls(),
    titleFormPreviewClose: 'Zatvoriť náhľad#Zavřit náhled#Close preview'.ls(),
    titleLogout: 'Odhlásiť sa#Odhlásit se#Logout'.ls(),
    titleSavePredefinedValues: 'Uložiť predvyplnené hodnoty#Uložit předvyplněné hodnoty#Save predefined values'.ls(),
    titleClearPredefinedValues: 'Vymazať predvyplnené hodnoty#Smazat předvyplněné hodnoty#Clear predefined values'.ls(),
    titleChangeID: 'Zmeniť ID#Změnit ID#Change ID'.ls(),
    titleSearching: 'Vyhľadávam...#Vyhledávám...#Searching...'.ls(),
    titleSearch: 'Vyhľadávanie podľa názvu#Vyhledávání podle názvu#Search by name'.ls(),
    titleDatabase: 'Databáza#Databáze#Database'.ls(),
    titleUnimarcFormat: 'Databáza#Databáze#Database'.ls(),
    titleVyhledat: 'Vyhľadať#Vyhledat#Search'.ls(),
    formName: 'Názov formulára#Název formuláře#Form name'.ls(),
    formNameNew: 'Nový formulár#Nový formulář#New form'.ls(),
    formId: 'ID formulára#ID formuláře#Form ID'.ls(),
    messageError: "Chyba#Chyba#Error".ls(),
    messageWarn: "Upozornenie#Upozornění#Warning".ls(),
    messageInfo: "Informácia#Informace#Information".ls(),
    messageOK: "OK#OK#OK".ls(),
    designerTagList: 'Zoznam tagov#Seznam tagů#Tag list'.ls(),
    designerTagDescription: 'Popis tagu#Popis tagu#Tag description'.ls(),
    designerSearchTag: 'Hľadať tag ...#Hledat tag ...#Search tag ...'.ls(),
    designerDesignedForm: 'Navrhnutý formulár#Navržený formulář#Designed form'.ls(),
    designerReallyDeleteTit: 'Vymazanie#Výmaz#Delete'.ls(),
    designerReallyDelete: 'Naozaj chcete vymazat formulár?#Opravdu chcete vymazat formulář?#Do you really want to delete form?'.ls(),
    //designerReallyChangeIdTit: 'Zmena ID#Změna ID#Change ID'.ls(),
    //designerReallyChangeId: 'Naozaj chcete zmenit id formulára?#Opravdu chcete změnit id formuláře?#Do you really want to change form id?'.ls(),
    evidenceFormNotValid: 'Nevyplnili ste niektorý z povinných údajov, záznam nie je možné uložiť.#Nevyplnili jste některý z povinných údajů, záznam není možné uložit.#Form is not valid and cannot be saved.'.ls(),
    evidenceFormNotValidCommon: 'Nevyplnili ste niektorý z povinných údajov.#Nevyplnili jste některý z povinných údajů.#Form is not valid.'.ls(),
    evidenceFormValidation: 'Validácia#Validace#Validation'.ls(),
    evidenceSearchRecordError: 'Pri vyhľadávaní záznamu sa vyskytla chyba. \nDetail chyby: #Při vyhledávání záznamu se vyskytla chyba. \nDetail chyby: #Problem while searching for record occured. \nDetails: '.ls(),
    evidenceOpenWholeRecordError: 'V danom formulári nie je možné otvoriť celý záznam.#V daném formuláři není možné otevřít celý záznam.#It was not possible to open whole record in selected form.'.ls(),
    evidenceSaveRecordSuccess: 'Záznam bol úspešne uložený.#Záznam byl úspěšně uložen.#Record saved successfully.'.ls(),
    evidencedeleteRecordSuccess: 'Záznam bol úspešne zmazaný.#Záznam byl úspěšně smazán.#Record deleted successfully.'.ls(),
    // 25.01.16 on; zmena ceske hlasky  kvuli CAV
    //evidenceCopyRecordSuccess : 'Kópia záznamu bola úspešne vytvorená.#Kopie záznamu byla úspěšně vytvořena.#Record copy created successfully.'.ls(),
    evidenceCopyRecordSuccess: 'Kópia záznamu bola úspešne vytvorená.#Kopie byla vytvořena, můžete ji editovat.#Record copy created successfully.'.ls(),
    evidenceCreateRecordError: 'Pri vytváraní záznamu sa vyskytla chyba: #Při vytváření záznamu se vyskytla chyba: #Problem with creating record: '.ls(),
    txReallyCreateRecordCopy: 'Naozaj chcete vytvoriť kópiu záznamu?#Opravdu chcete vytvořit kopii záznamu?#Do you really want to cretae the record copy?'.ls(),
    // 08.09.17 on; hlaska zkracena (CAV)
    //evidenceManipulatingFormError: 'Záznam sa nepodarilo uložiť. \nPri manipulácií s formulárom sa vyskytla chyba:\n#Záznam se nepodařilo uložit. \nPři manipulaci s formulářem se vyskytla chyba:\n#Unable to save record. \nProblem while manipulating with form occured:\n'.ls(),
    evidenceManipulatingFormError: 'Záznam sa nepodarilo uložiť. \n#Záznam se nepodařilo uložit. \n#Unable to save record. \n'.ls(),
    evidenceDeleteRecordError: 'Záznam sa nepodarilo vymazať. \n#Záznam se nepodařilo vymazat. \n#Unable to delete record. \n'.ls(),
    evidenceOpenRecordError: 'Pri otvorení záznamu sa vyskytla chyba:#Při otevření záznamu se vyskytla chyba:#Problem while opening record occured:'.ls(),
    evidenceRecordNotSelected: 'Nevybrali ste záznam.#Nevybrali jste záznam.#You have not selected a record.'.ls(),
    evidenceFormNotSelected: 'Nevybrali ste formulár.#Nevybrali jste formulář.#You have not selected a form.'.ls(),
    evidencePreviewClose: 'Zatvoriť náhľad#Zavřít náhled#Close preview'.ls(),
    evidenceReallyCloseTit: 'Zatvorenie#Zavření#Close'.ls(),
    evidenceReallyClose: 'Záznam bol zmenený. Naozaj ho chcete uzavrieť?#Záznam byl změněn. Opravdu ho chcete zavřít?#Record is changed. Do you really want to close it?'.ls(),
    evidenceReallyLogoutTit: 'Odhlásenie#Odhlášení#Logout'.ls(),
    evidenceReallyLogout: 'Niektorý zo záznamov bol upravený. Naozaj sa chcete odhlásiť?#Některý ze záznamů byl upraven. Opravdu se chcete odhlásit?#One of the records was modified. Do you really want to log out?'.ls(),
    evidenceSet969f: 'Nastaviť 969f#Nastavit 969f#Set 969f'.ls(),
    evidenceClear969f: 'Odmazať 969f#Odmazat 969f#Clear 969f'.ls(),
    evidenceFirstSave: 'Pred odoslaním najprv uložte záznam do databáze.#Před odesláním nejprve uložte záznam do databáze#Save the record into the database before sending.'.ls(),
    evidenceSendRecordSuccess: 'Záznam bol úspešne odoslaný.#Záznam byl úspěšně odeslán.#Record sent successfully.'.ls(),
    // 08.09.17 on; hlaska zkracena (CAV)
    evidenceSendRecordError: 'Záznam sa nepodarilo odoslať. \n#Záznam se nepodařilo odeslat. \n#Unable to send record. \n'.ls(),
    evidenceClear969fNotFound: 'Nebyla nalezena hodnota "%s" v poli 969f!'.ls(),
    evidenceFirstSaveCommon: 'Záznam najprv uložte do databázy.#Záznam nejprve uložte do databáze.#Save the record first.'.ls(),
    // 27.11.17 on;
    evidenceFirstSaveEdited: 'Upravený záznam najprv uložte do databázy.#Upravený záznam nejprve uložte do databáze.#Save the edited record first.'.ls(),
    txDisplayFmtFailed: 'Požadavok na zobrazovací formát zlyhal: #Požadavek na zobrazovací formát selhal: #Display format request failed: '.ls(),
    txUpdateZF: 'Aktualizovať#Aktualizovat#Update'.ls(),
    txDisplayFormat: 'Zobrazovací formát#Zobrazovací formát#Display Format'.ls(),
    txEPCA: 'Evidencia publikačnej činnosti#Evidence publikační činnosti#EPCA'.ls(),
    txSelect: 'Vybrať#Vybrat#Select'.ls(),
    txPrint: 'Tlač#Tisk#Print###طباعة'.ls(),
    txExport: 'Export#Export#Export'.ls(),
    titleCopyRecord: 'Vytvoriť kópiu záznamu#Vytvořit kopii záznamu#Copy record'.ls(),
    titleCheckRecord: 'Skontrolovať záznam#Zkontrolovat záznam#Check record'.ls(),
    titleWosScopusImport: 'Import z WOS/SCOPUS'.ls(),
    titleReportsLink: 'Výstupy'.ls(),
    titleUploadContentServer: 'Nahrať prílohu#Nahrát přílohu#Upload attachment'.ls(),
    txOpeningRecord: 'Otváram záznam ... prosím čakajte#Otvírám záznam ... prosím čekejte#Opening record ... please wait'.ls(),
    txSavingRecord: 'Ukladám záznam ... prosím čakajte#Ukládám záznam ... prosím čekejte#Saving record ... please wait'.ls(),
    txDeletingRecord: 'Mažem záznam ... prosím čakajte#Mažu záznam ... prosím čekejte#Deleting record ... please wait'.ls(),
    txSendingRecord: 'Odosielam záznam ... prosím čakajte#Odesílám záznam ... prosím čekejte#Sending record ... please wait'.ls(),
    txCopyingRecord: 'Ukladám kópiu záznamu ... prosím čakajte#Ukládám kopii záznamu ... prosím čekejte#Saving copy of record ... please wait'.ls(),
    txMaxFieldLength: 'Maximálna povolená dĺžka pola je %s!#Maximální povolená délka pole je %s!#Maximal field length is %s!'.ls(),
    // 28.11.16 on;
    txInvalidDate: '"{0}" nie je platný dátum - musí byť vo formáte DD.MM.RRRR alebo RRRRMMDD#"{0}" není platné datum - musí být ve formátu DD.MM.RRRR nebo RRRRMMDD#"{0}" is not a valid date - it must be in the format DD.MM.YYYY or YYYYMMDD'.ls(),
    txEmptyDate: 'Pole je povinné.#Pole je povinné.#This field is required.'.ls(),
    txLoading: 'načítam..#načítám..#loading..'.ls(),
    txErrorSortingRecord: 'chyba pri radení MARC záznamu; problém na riadku %s!#chyba při řazení MARC záznamu; problém na řádku %s!#problem sorting MARC record; problem at line=%s!'.ls(),
    txFormIdEmpty: 'K záznamu nie je priradený žiadny formulár!#K záznamu není přiřazený žádný formulář!#This record does not contain default form name!'.ls(),
    txErrorGetForm: 'Formulár s ID "%s" nebol nájdený!#Formulář s ID "%s" nebyl nalezen!#Form with ID "%s" not found!'.ls(),
    titleDeleteBtn: 'Vymazať#Vymazat#Delete'.ls(),
    evidenceDeleteNewRecordError: 'Nedá sa zmazať neuložený záznam!#Nelze smazat neuložený záznam!#Unable to delete unsaved record!'.ls()
};
Ext.reg('epca.L10n', epca.L10n);
