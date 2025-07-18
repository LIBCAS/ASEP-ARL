$PSDefaultParameterValues['Out-File:Encoding'] = 'UTF8'
$PSDefaultParameterValues['*:Encoding'] = 'UTF8'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

<#
.SYNOPSIS

.DESCRIPTION

.NOTES
  Version:        1.3
  Author:         Karel Pavelka
  Creation Date:  14.10.2024
#>

# Identifikace jazyka
$language = (Get-UICulture).Name
$appDir = "ps1"
$appScript = "Main.ps1"
$appTmpDir = "temp"

# Načtení jazykové lokalizace
# Try to load the localized text from a JSON file
try {
    $localText = Get-Content -Path "$($appDir)/_locales/$($language).json" -Raw | ConvertFrom-Json
}
catch {
    # If the language file cannot be loaded, fall back to English
    $language = "en-GB"
    $localText = Get-Content -Path "$($appDir)/_locales/$($language).json" -Raw | ConvertFrom-Json
}


function Get-Ictx {
    param (
        [string]$ictx
    )

    if ([string]::IsNullOrEmpty($ictx)) { 
        $ictx = Read-Host -Prompt $localText.type_ictx
    }
    if ([string]::IsNullOrEmpty($ictx)) { 
        $ictx = "cbvk" 
    }

    return $ictx
}


function TranslateTemplate {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Template,

        [Parameter(Mandatory = $true)]
        [PSCustomObject]$localText
    )

    # Use regex to find all keys in the template
    $matches = [regex]::Matches($Template, '\{(\w+)\}')

    foreach ($match in $matches) {
        # Extract key from match (without the {})
        $key = $match.Groups[1].Value

        # Only replace the key if it is in our localized text file
        if ($localText.$key) {
            $Template = $Template -replace "\{$key\}", $localText.$key
        }
    }

    return $Template
}


function LoadAndTranslateTemplate {
    param(
        [string]$templatePath,
        [PSCustomObject]$localText
    )

    # Načtení externí šablony
    $htmlTemplate = Get-Content -Path $templatePath -Raw

    # Přeložení šablony
    return TranslateTemplate -Template $htmlTemplate -localText $localText
}

function ReplaceTemplatePlaceholders {
    param(
        [string]$template,
        [string]$taskOutput,
        [string]$appDir
    )

    $filledTemplate = $template.Replace("{0}", "../../$($appDir)/")
    $filledTemplate = $filledTemplate.Replace("{1}", $taskOutput)
    return $filledTemplate
}

function Process-GruntOutput {
    param(
        [string]$taskOutput
    )

    Write-Footer "IPAC: $($localText.sass_documentation)"
    $id = "task"
    $sTemplatePath = "$($appDir)/$($id)/template.html"
    $sReportPath = "temp/$($appDir)/$($id).html"
    
    # Načtení a přeložení šablony
    $htmlTemplate = LoadAndTranslateTemplate -templatePath $sTemplatePath -localText $localText

    # Nahrazení proměnných ve šabloně
    $filledTemplate = ReplaceTemplatePlaceholders -template $htmlTemplate -taskOutput $taskOutput -appDir $appDir
    
    # Úprava výstupu z Gruntu
    $filledTemplate = BeakOutputGrunt $filledTemplate
    
    # Uložení výsledné šablony
    $filledTemplate | Out-File -FilePath $sReportPath
    
    # Otevření HTML souboru v prohlížeči
    Start-Process -FilePath $sReportPath
}


# Zalomení výstupu z Gruntu 
function BeakOutputGrunt {
    param(
        [AllowNull()][string] $filledTemplate
    )
    if ($filledTemplate) {
        # Nahrazení pomocí více pravidel najednou
        $replaceMap = @{
            "Loading"      = "<br>Loading";
            "Registering"  = "<br>Registering";
            "Parsing"      = "<br>Parsing";
            "Verifying"    = "<br>Verifying";
            "Reading"      = "<br>Reading";
            "Files"        = "<br>Files";
            "OK"           = "<b class='ok'>OK</b>";
            "Options"      = "<br>Options";
            ">>"           = "<br>>>"
        }

        foreach ($key in $replaceMap.Keys) {
            $filledTemplate = $filledTemplate.Replace($key, $replaceMap[$key])
        }
    }
    return $filledTemplate
}


# Generování hlavičky pro Grunt task
function WriteHeader {
    param(
        [Parameter(Mandatory = $true)][string] $title,
        [Parameter(Mandatory = $false)][string] $subtitle
    )

    # Načtení šablony
    $template = Get-Content -Path "$($appDir)/Header.tpl" -Raw

    # Vložení textů
    $template = $template.Replace('{Title}', $title)
    $template = $template.Replace('{SubTitle}', $subtitle)

    # Rozdělte hlavičku na řádky
    $lines = $template -split "\r\n"

    # Vypis hlavičky s barvou
    Write-Host $lines[0] -ForegroundColor Cyan
    Write-Host $lines[1] -ForegroundColor Yellow
    Write-Host $lines[2] -ForegroundColor Yellow
    Write-Host $lines[3] -ForegroundColor Gray
    Write-Host $lines[4] -ForegroundColor Cyan
}

# Generování položky pro Grunt task
function WriteItem {
    param(
        [Parameter(Mandatory = $true)][string] $title,
        [Parameter(Mandatory = $false)][string] $subtitle
    )

    # Načtení šablony
    $template = Get-Content -Path "$($appDir)/Item.tpl" -Raw

    # Vložení textů
    $template = $template.Replace('{Title}', $title)
    $template = $template.Replace('{SubTitle}', $subtitle)

    # Rozdělte hlavičku na řádky
    $lines = $template -split "\r\n"

    # Vypis hlavičky s barvou
    Write-Host $lines[0] -ForegroundColor Cyan
    Write-Host $lines[1] -ForegroundColor Yellow
    Write-Host $lines[2] -ForegroundColor Yellow
    Write-Host $lines[4] -ForegroundColor Cyan
}


# Generování patičky pro Grunt task
function WriteFooter {
    param(
        [Parameter(Mandatory = $true)][string] $title,
        [Parameter(Mandatory = $false)][string] $subtitle
    )

    # Načtení šablony
    $template = Get-Content -Path "$($appDir)/Footer.tpl" -Raw

    # Vložení textů
    $template = $template.Replace('{Title}', $title)
    $template = $template.Replace('{SubTitle}', $subtitle)

    # Rozdělení hlavičky na řádky
    $lines = $template -split "\r\n"

    # Vypis hlavičky s barvou
    Write-Host $lines[0] -ForegroundColor Cyan
    Write-Host $lines[1] -ForegroundColor Yellow
    Write-Host $lines[2] -ForegroundColor Yellow
    Write-Host $lines[3] -ForegroundColor Cyan
}

# Funkce pro čtení jednoho znaku
function Read-Key($prompt) {
    Write-Host -NoNewline $prompt
    $keyInfo = [System.Console]::ReadKey($true)
    Write-Host
    return $keyInfo.Key
}

function Invoke-Task {
    param (
        [string]$functionName
    )
    Invoke-Command -ScriptBlock (Get-Command $functionName).ScriptBlock
}

# Run task
function RunTask {
    param(
        [string]$functionName
    )

    Invoke-Task -functionName $functionName

    # Nabídnout znovu spustit úlohu
    $key = Read-Key $localText.run_again
    while ($key -eq 'y' -or $key -eq 'a') {
        Invoke-Task -functionName $functionName
        $key = Read-Key $localText.run_again
    }
}

# Konverze z HTML entit na znaky 
function ConvertHtmlEntitiesToChars {
    param(
        [AllowNull()][string] $string
    )
    if ($string) {
        $string = $string.Replace("&lt;", "<")
        $string = $string.Replace("&gt;", ">")
        $string = $string.Replace("&amp;", "&")
        $string = $string.Replace("&quot;", '"')
        $string = $string.Replace("&#39;", "'")
    }
    return $string
}

function Audit {
    WriteHeader "Audit NPM"
    Invoke-Expression "npm audit fix --force"
    WriteFooter "Audit NPM"
}

function Install {
    $id = "plugins"
    $sConfigPath = "$($appDir)/$($id)/config.json"
    mkdir ".\temp\$($appDir)" -Force

    WriteHeader $localText.install_title

    # Načtení konfiguračního souboru
    $json = Get-Content -Path $sConfigPath | ConvertFrom-Json

    # Začátek instalace
    Invoke-Expression "npm install" 
    Invoke-Expression "npm install npm@latest -g"
    Invoke-Expression "npm install grunt-cli -g"

    # For each item in the JSON data
    foreach ($item in $json.items) {
        # Instalations
        try {
            Invoke-Expression "npm install $($item.install)"
        }
        catch {
        
        }
    }

    # Závěr instalace
    Invoke-Expression "choco upgrade sass"
    Audit
    GenFiles
}

function GenFiles {
    Create-Ps1File -fileName "Uinstall" -content ". .\$($appDir)\$($appScript)`n`nUinstall"
    Create-Ps1File -fileName "Upgrade" -content ". .\$($appDir)\$($appScript)`n`nUpgrade"
    Create-Ps1File -fileName "Versions" -content ". .\$($appDir)\$($appScript)`n`nVersions"
    Create-Ps1File -fileName "Audit" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"Audit`""
    Create-Ps1File -fileName "Task_GruntFile" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskGruntFile`""
    Create-Ps1File -fileName "Task_I3_Clean" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskI3Clean`""
    Create-Ps1File -fileName "Task_IPAC" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskIPAC`""
    Create-Ps1File -fileName "Task_IPAC_SASS" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskIPACSass`""
    Create-Ps1File -fileName "Task_IPAC_Clean" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskIPACClean`""
    Create-Ps1File -fileName "Task_IPAC_JS" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskIPACJS`""
    Create-Ps1File -fileName "Task_PWA" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskPWA`""
    Create-Ps1File -fileName "Task_IPAC_Templates_CSP" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskTemplates`""
    Create-Ps1File -fileName "Task_IPAC_Doc_SASS" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskIPACDocSass`""
    Create-Ps1File -fileName "Task_IPAC_GROUP_USERS" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskGroupUsers`""
    Create-Ps1File -fileName "Task_IPAC_JS_All_USERS" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskIPACJSUsers`""
    Create-Ps1File -fileName "Task_IPAC_All_USERS_SASS_Reformat" -content ". .\$($appDir)\$($appScript)`n`nRunTask -functionName `"TaskReformatAllSass`""
}

function Upgrade {

    WriteHeader "Start: Grunt upgrade"
    Invoke-Expression "npm install npm@latest -g"
    Invoke-Expression "npm cache clean --force"
    Audit
    Invoke-Expression "npm update"
    WriteFooter "End: Grunt upgrade"

    Read-Host $localText.press_enter_to_close

}


function Uinstall {

    $id = "plugins"
    $sConfigPath = "$($appDir)/$($id)/config.json"

    WriteHeader $localText.uinstall_title

    # Načtení konfiguračního souboru
    $json = Get-Content -Path $sConfigPath | ConvertFrom-Json

    # For each item in the JSON data
    foreach ($item in $json.items) {
        # Unstalations
        try {
            Invoke-Expression "npm uinstall $($item.install)"
        }
        catch {
        
        }
    }
    Invoke-Expression "npm uinstall grunt-cli --force"

    # Závěr odinstalace
    Invoke-Expression "npm cache clean --force"
    Invoke-Expression "rm -rf node_modules"
    Invoke-Expression "rm package-lock.json"
    Read-Host $localText.press_enter_to_close
}

# Načtení jazykové lokalizace a hlavních funkcí
function Versions {

    $id = "versions"
    $sReportPath = "temp/$($appDir)/$($id).html"
    $sConfigPath = "$($appDir)/$($id)/config.json"
    $sPluginsPath = "$($appDir)/plugins/config.json"
    $sTemplatePath = "$($appDir)/$($id)/template.html"


    # Načtení konfiguračního souboru programů
    $json = Get-Content -Path $sConfigPath | ConvertFrom-Json
    # Načtení konfiguračního souboru pluginů
    $json2 = Get-Content -Path $sPluginsPath | ConvertFrom-Json

    $TotalCount = ($json.items.Count + $json2.items.Count)
    $Count = 0;

    # Načtení externí šablony
    $htmlTemplate = Get-Content -Path $sTemplatePath -Raw

    # Přeložení šablony
    $htmlTemplate = TranslateTemplate -Template $htmlTemplate -localText $localText
    # Write-Host $htmlTemplate


    # Define an empty array to store the data
    $data = @()

    # For each item in the JSON data
    foreach ($item in $json.items) {

        $Count = 1 + $Count;

        # Aktualizace progresbaru
        $Progress = @{
            Activity        = $localText.data_processing
            Status          = "$($localText.browsing_item) $($Count) $($localText.from) $($TotalCount)"
            PercentComplete = ($Count / $TotalCount) * 100
        }
        Write-Progress @Progress

        # Try to get the version of the program
        try {
            $version = ((Invoke-Expression ($item.'version' + " 2>&1")) -join ' ')
        }
        catch {
            # If there's an error, set the version to "Program is not installed"
            $version = "$($item.'program') ${$localText.notinstalled}"
        }

        # Set program link variables to empty strings
        $programLinkStart = ""
        $programLinkEnd = ""

        # If the item has a download link, create the link HTML
        if ($item.'download') {
            $programLinkStart = "<a title='$($localText.download) $($item.program)' aria-label='$($localText.download) $($item.name)' rel='external' target='_blank' href='$($item.download)'>"
            $programLinkEnd = "</a>"
        }

        # Add the program and its version to the data array
        $data += New-Object PSObject -Property @{program = "<img src='../../$($appDir)/$($id)/$($item.'name').svg' width='20'> " + $programLinkStart + $item.'program' + $programLinkEnd; version = $version }
    }

    # Write-Host $localText.program
    # Convert the data to HTML, use the template, and save it to a file
    $dataHtml = $data | ConvertTo-Html -Property @{Label = $localText.program; expression = { $_.program } }, @{Label = $localText.version; expression = { $_.version } } -Fragment

    $dataHtml = ConvertHtmlEntitiesToChars $dataHtml

    # add class to table tag
    $dataHtml = $dataHtml -replace "<table>", "<table id='programs-table' class='table'>"

    # Write-Host $dataHtml
    $filledTemplate = $htmlTemplate.Replace("{0}", "../../$($appDir)/")
    $filledTemplate = $filledTemplate.Replace("{1}", $dataHtml)
    # Write-Host $filledTemplate

    # Define an empty array to store the data
    $data2 = @()

    # Verze pluginů.
    # For each item in the JSON data
    foreach ($item2 in $json2.items) {

        $Count = 1 + $Count;

        # Aktualizace progresbaru
        $Progress = @{
            Activity        = $localText.data_processing
            Status          = "$($localText.browsing_item) $($Count) $($localText.from) $($TotalCount)"
            PercentComplete = ($Count / $TotalCount) * 100
        }
        Write-Progress @Progress

        # Try to get the version of the program
        try {
  
            $version = Invoke-Expression "npm list $($item2.'name') --depth=0"
            $versionData = $version -join ' '
            # Write-Host $version
            $regex = "(?i)($($item2.'name'))(@| )([0-9\.]+)"
            if ($versionData -match $regex) {
                $version = $matches[3]
            }
            else {
                if (!$versionData) {
                    $version = $localText.notinstalled
                }

            }
        }
        catch {
            # If there's an error, set the version to "Program is not installed"
            $version = $localText.notinstalled
        }

        # Set program link variables to empty strings
        $programLinkStart = ""
        $programLinkEnd = ""

        # If the item has a download link, create the link HTML
        if ($item2.'url') {
            $programLinkStart = "<a title='$($localText.url) $($item2.name)' aria-label='$($localText.url) $($item2.name)' rel='external' target='_blank' href='$($item2.url)'>"
            $programLinkEnd = "</a>"
        }

        # Add the program and its version to the data array
        $data2 += New-Object PSObject -Property @{program = $programLinkStart + $item2.'name' + $programLinkEnd; version = $version }
    }

    # Convert the data to HTML, use the template, and save it to a file
    $dataHtml2 = $data2 | ConvertTo-Html -Property @{Label = $localText.plugin; expression = { $_.program } }, @{Label = $localText.version; expression = { $_.version } } -Fragment

    $dataHtml2 = ConvertHtmlEntitiesToChars $dataHtml2

    # add class to table tag
    $dataHtml2 = $dataHtml2 -replace "<table>", "<table id='plugins-table' class='table'>"

    # Write-Host $dataHtml2
    $filledTemplate = $filledTemplate.Replace("{2}", $dataHtml2)
    # Write-Host $filledTemplate

    Write-Progress -Activity $localText.data_processing -Completed


    # Vygenerování HTML

    $filledTemplate -f $filledTemplate | Out-File -FilePath $sReportPath

    # Open the HTML file in the default browser
    Start-Process -FilePath $sReportPath

    Read-Host -Prompt $localText.press_enter_to_close

}

function MyTask {
    param(
        [Parameter(Mandatory = $true)][string] $command,
        [Parameter(Mandatory = $true)][string] $title,
        [AllowNull()][string] $subtitle
    )
    WriteHeader $title $subtitle
    Invoke-Expression $command
    WriteFooter $title $subtitle
}

function TaskGruntFile {
    MyTask "grunt gruntfile --verbose" $localText.maintaining_grunt $localText.reformatting_valid_doc 
}

function TaskI3Clean {
    MyTask "grunt i3clean --verbose" $localText.cleaning_i3
}

function TaskReformatAllSass {
    MyTask "grunt allsassusers --verbose" "IPAC: $($localText.reformatting_sass)" 
}

function TaskIPACClean {
    MyTask "grunt ipclean --verbose" "IPAC: $($localText.cleaning_files)"
}

function TaskIPACDocSass {
    WriteHeader "IPAC: $($localText.sass_documentation)" 
    $taskOutputArray = Invoke-Expression "grunt docipacsass --verbose"
    $taskOutput = [string]::Join("`n", $taskOutputArray)
    Process-GruntOutput -taskOutput $taskOutput
}

function TaskIPACSass {
    MyTask "grunt ipacsass --verbose" "IPAC: $($localText.sass_css_js_cpcp)"
}

function TaskTemplates {
    MyTask "grunt ipactpl" $localText.remove_bom_from_tpl
}

function TaskPWA {
    MyTask "grunt pwa --verbose" "SASS PWA"
}

function TaskIPAC {
    MyTask "grunt ipac" "IPAC: $($localText.sass_css_js_cpcp)"
}

function TaskIPACJS {
    MyTask "grunt ipacjstest" "IPAC: $($localText.reformatting_js)"
}

function TaskIPACJSUsers {
    MyTask "grunt ipacjstestuser --verbose" "ALL USERS IPAC: $($localText.sass_css_js_cpcp)"
}


function TaskGroupUsers {
    # Cesta k adresáři
    $dirPath = "$($appDir)/customers"

    WriteHeader $localText.sass_css_js_cpcp $localText.work_selected_group

    # načteme všechny json soubory
    $jsonFiles = Get-ChildItem -Path $dirPath -Filter *.json

    # Nabídka z názvů souborů bez přípony
    $menu = @{}
    for ($i = 0; $i -lt $jsonFiles.Count; $i++) {
        $fileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($jsonFiles[$i].Name)
        $menu.Add($i + 1, $fileNameWithoutExtension)
    }

    # Zobrazt nabídku
    $menu.Keys | ForEach-Object { Write-Host "$_ - $($menu[$_])" }

    # Uživatel si vybere z nabídky
    $userChoice = Read-Host $localText.select_group
    $userChoice = [int]$userChoice

    # Ověřít, že uživatel zvolil platnou možnost
    Write-Host $userChoice
    if ($menu.ContainsKey($userChoice)) {
        $selectedFile = Join-Path -Path $dirPath -ChildPath ($menu[$userChoice] + ".json")
        # Načíst JSON soubor
        $jsonData = Get-Content $selectedFile -Raw | ConvertFrom-Json
        # Počet položek
        $numberOfItems = $jsonData.items.Count
        $remains = $numberOfItems;
        $i = 1;
        foreach ($item in $jsonData.items) {
            $remains = $remains - 1
            Invoke-Expression "grunt i2 --ictx=$($item.ictx)"
            WriteItem "$($localText.processed) $i. $($localText.client): $($item.ictx), $($localText.remains) $($remains) $($localText.from) $($numberOfItems)" 
            $i = $i + 1;
        }
    }
    else {
        Clear-Host
        Write-Host $localText.incorrect_input  -ForegroundColor Red
        TaskGroupUsers
    }
}


function Create-Ps1File {
    param (
        [Parameter(Mandatory = $true)]
        [string]$fileName,

        [Parameter(Mandatory = $true)]
        [string]$content
    )

    # Přidáme příponu .ps1, pokud ji název souboru ještě nemá
    if ($fileName -notmatch "\.ps1$") {
        $fileName += ".ps1"
    }

    # Vytvoříme nebo přepíšeme soubor s daným obsahem
    Set-Content -Path $fileName -Value $content -Force
}

