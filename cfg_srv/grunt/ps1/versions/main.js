document.addEventListener("DOMContentLoaded", () => {

// Přidání sloupce "Aktuální" do všech tabulek
    const tables = document.querySelectorAll("table");
    const main = document.querySelector("main");
    const currentVersion = main.getAttribute("data-tx-current");

// Projdeme všechny tabulky
    tables.forEach(table => {
        const headerRow = table.querySelector("tr");
        const newHeader = document.createElement("th");
        newHeader.textContent = currentVersion;
        headerRow.appendChild(newHeader);

        // Projdi všechny řádky tabulky a zjisti poslední verzi pro GitHub odkazy
        const rows = table.querySelectorAll("tr");
        rows.forEach(async (row, index) => {
            // Vynech první řádek (hlavičku)
            if (index === 0)
                return;

            const pluginCell = row.cells[0];
            const versionCell = row.cells[1];

            // Vytvoř novou buňku pro aktuální verzi
            const newCell = document.createElement("td");
            row.appendChild(newCell);

            const link = pluginCell.querySelector("a");
            if (link && link.href.includes("github.com")) {
                // Načti poslední verzi z GitHubu
                const latestVersion = await getLatestRelease(link.href);
                newCell.textContent = latestVersion || "";  // Pokud není dostupná verze z GitHubu, použij hodnotu z main
            } else {
                // Pokud není GitHub odkaz, nastav "Aktuální" hodnotu z main
                newCell.textContent = "";
            }
        });
    });

// Funkce pro získání poslední verze z GitHub API
    async function getLatestRelease(repoUrl) {
        try {
            // Získání posledního vydání
            const apiUrl = repoUrl.replace("https://github.com/", "https://api.github.com/repos/") + "/releases/latest";
            const response = await fetch(apiUrl, {
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            if (response.ok) {
                const releaseData = await response.json();
                // Odstraň prefix "v", pokud existuje
                return releaseData.tag_name.replace(/^v/, "");
            } else if (response.status === 404) {
                // Pokud poslední verze není k dispozici, pokusíme se zjistit poslední tag
                return await getLatestTag(repoUrl);
            } else {
                throw new Error(`GitHub API vrátilo chybu: ${response.status}`);
            }
        } catch (error) {
            console.error("Chyba při načítání verze:", error);
            return "";  // Vrať prázdný řetězec, pokud se nepodaří načíst verzi
        }
    }

// Funkce pro získání posledního tagu z GitHub API
    async function getLatestTag(repoUrl) {
        try {
            const tagsApiUrl = repoUrl.replace("https://github.com/", "https://api.github.com/repos/") + "/tags";
            const response = await fetch(tagsApiUrl, {
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            if (response.ok) {
                const tagsData = await response.json();
                if (tagsData.length > 0) {
                    // Odstraň prefix "v", pokud existuje
                    return tagsData[0].name.replace(/^v/, "");
                } else {
                    return "";
                }
            } else {
                throw new Error(`GitHub API vrátilo chybu: ${response.status}`);
            }
        } catch (error) {
            console.error("Chyba při načítání tagu:", error);
            return "";  // Vrať prázdný řetězec, pokud se nepodaří načíst tagy
        }
    }
});