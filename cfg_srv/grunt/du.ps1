# Constants
$ictxdir = "c:\SVN\DEV\vyvoj2022\ipac2\csp-dir\_user-backup\"
$exportfile = Join-Path -Path $ictxdir -ChildPath "data-all.csv"

# Use StrictMode for better error detection
Set-StrictMode -Version Latest

# File types and their specific path parts
$fileTypes = @{
    "js"    = "\js\";
    "csp"   = "\templates2\";
    "scss"  = "\_backup\sass\";
}


# Function to create a calculated property
function Get-CalculatedProperty($filePath, $fileType) {
    $pathPartIndex = $filePath.IndexOf($fileTypes[$fileType])
    $backupIndex = $filePath.IndexOf("\_user-backup\")
    $content = Get-Content -Path $filePath -Raw
    $value = if ($content -match "<du>") {
        ($content.Substring($content.IndexOf("<du>") + 4, $content.LastIndexOf("</du>") - ($content.IndexOf("<du>") + 4))).Replace(".", ",")
    } else {
        0
    }

    if ($pathPartIndex -ge 0 -and $backupIndex -ge 0) {
        return @{
            'Ictx' = ($filePath.Substring($backupIndex + 14)).Split("\")[0]
            'ShortPath' = $filePath.Substring($pathPartIndex)
            'Typ' = $fileType
            'Value' = $value
        }
    }
    else {
        Write-Host "Invalid path for file type: $fileType"
    }
}



# Main loop
foreach ($fileType in $fileTypes.Keys) {
    Get-ChildItem -Path $ictxdir -Recurse -Include "*.$fileType" | ForEach-Object {
        $calculatedProperty = Get-CalculatedProperty -filePath $_.FullName -fileType $fileType
        $_ | Select-Object -Property @{Name = 'Ictx'; Expression = {$calculatedProperty.Ictx}}, 
                                      @{Name = 'ShortPath'; Expression = {$calculatedProperty.ShortPath}}, 
                                      @{Name = 'Typ'; Expression = {$calculatedProperty.Typ}}, 
                                      @{Name = 'Value'; Expression = {$calculatedProperty.Value}} |
            Export-Csv -Path $exportfile -NoTypeInformation -Append -Force
    }
}
