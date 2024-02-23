. .\ps1\Main.ps1

function MainTask {
	$ictx = Get-Ictx "cav"

	WriteHeader "$($localText.working_customer_directory) ipac2/csp-dir/user/$($ictx)/" "IPAC: $($localText.sass_css_js_cpcp)"
	Invoke-Expression "grunt i2 --ictx=$($ictx) --verbose"
	WriteFooter "$($localText.working_customer_directory) ipac2/csp-dir/user/$($ictx)/"
}

MainTask
RunTask MainTask