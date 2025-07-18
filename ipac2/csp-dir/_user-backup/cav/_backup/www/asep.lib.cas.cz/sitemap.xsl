<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" version="5.0" omit-xml-declaration="yes" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en-GB"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title class="tx" data-cs="XML mapa stránek" data-sk="XML mapa stránok">XML sitemap</title>
<meta name="robots" content="index, follow"/><meta name="author" content="Cosmotron.cz"/><meta name="description" content="XML sitemap designed for search engines."/><meta name="keywords" content="sitemap, xml"/><link rel="icon" type="image/vnd.microsoft.icon" href="https://asep.lib.cas.cz/favicon.ico"/><meta property="og:type" content="website"/><meta property="og:title" content="XML sitemap"/><meta property="og:url" content="https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap_index.xml"/><meta property="og:locale" content="en_GB"/><meta name="twitter:card" content="summary"/><meta name="twitter:title" content="XML sitemap"/><meta name="twitter:description" content="XML sitemap designed for search engines."/><meta name="twitter:url" content="https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap_index.xml"/><link rel="canonical" href="https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap_index.xml"/><link rel="shortcut icon" type="image/x-icon" href="https://asep.lib.cas.cz/favicon.ico"/><link type="text/plain" rel="author" href="https://asep.lib.cas.cz/humans.txt"/><link rel="stylesheet" href="https://asep.lib.cas.cz/i2/css/sitemap.css"/><script src="https://asep.lib.cas.cz/i2/js/sitemap.js"></script><link rel="sitemap" type="application/xml" href="https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap_index.xml"/><link rel="first" href="https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap1.xml"/><link rel="help" href="https://cosmo2/wiki/index.php?title=I2:concepts_Sitemap.xml"/></head><body><div id="page"><div class="container"><div class="jumbotron"><header>
<h1 class="tx" data-cs="XML mapa stránek" data-sk="XML mapa stránok">XML sitemap</h1>
<div id="intro"><p>
<span class="tx" data-cs="XML mapa stránek určená pro vyhledávací roboty." data-sk="XML mapa stránok určená pre vyhľadávacie roboty.">XML sitemap designed for search engines.</span><br/>
<span class="tx" data-cs="Více informací o XML mapě stránek naleznete na" data-sk="Viac informácií o XML mape stránok nájdete na">You can find more information about the XML sitemap at</span><xsl:text>&#160;</xsl:text>
<a rel="external" hreflang="en-GB" href="https://sitemaps.org/">sitemaps.org</a>.
</p>
<ul class="nav flex-column">
<li class="nav-item"><a class="nav-link" target="_blank" rel="external" href="https://cosmo2/wiki/index.php?title=I2:concepts_Sitemap.xml"><i aria-hidden="true" class="icon-wikipedia"></i> Wiki: Interní dokumentace Sitemap</a></li><li class="nav-item"><a class="nav-link" target="_blank" href="https://asep.lib.cas.cz/robots.txt"><i aria-hidden="true" class="icon-doc-text"></i> robots.txt</a></li><li class="nav-item"><a class="nav-link" target="_blank" rel="external" href="https://search.google.com/search-console?resource_id=https://asep.lib.cas.cz/"><i aria-hidden="true" class="icon-google-search-console"></i> Google Search Console</a></li><li class="nav-item"><a href="https://asep.lib.cas.cz/i3/webadmin/?class=UnTablesd&amp;amp;t001=SITEMAP" class="nav-link" target="_blank"><i aria-hidden="true" class="icon-sitemap"></i> Konfigurace sitemap v čísleníku: UnTablesd/SITEMAP</a></li></ul>
</div></header>
</div></div><main class="container">
<xsl:if test="sitemap:urlset">
<xsl:variable name="current-url" select="'https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap1.xml'"/>
<nav aria-label="Pagination">
<ul class="pagination" style="flex-wrap:wrap">
<li class="page-item"><a class="page-link" href="https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap_index.xml"><i aria-hidden="true" class="icon-sitemap"></i></a></li><xsl:for-each select="document('https://asep.lib.cas.cz/aRLreports/sitemaps/sitemap_index.xml')/sitemap:sitemapindex/sitemap:sitemap">
<li class="page-item"><a class="page-link" href="{sitemap:loc}"><xsl:value-of select="position()"/></a>
</li></xsl:for-each>
</ul>
</nav>
<table class="table table-striped">
<thead>
<tr>
<th scope="col" class="url">URL</th>
<th scope="col" class="priority tx" data-cs="Priorita" data-sk="Priorita">Priority</th>
<th scope="col" class="changefreq tx" data-cs="Frekvence" data-sk="Frekvencia">Frequency</th>
<th scope="col" class="lastmod tx" data-cs="Aktualizace" data-sk="Aktualizácia">Update</th>
</tr>
</thead>
<tbody>
<xsl:for-each select="sitemap:urlset/sitemap:url">
<tr>
<xsl:if test="position() mod 2 != 1">
<xsl:attribute name="class">even</xsl:attribute>
</xsl:if>
<td class="url">
<xsl:variable name="itemURL">
<xsl:value-of select="sitemap:loc"/>
</xsl:variable>
<a href="{$itemURL}">
<xsl:value-of select="sitemap:loc"/>
</a>
</td>
<td class="priority">
<xsl:value-of select="concat(sitemap:priority*100,'%')"/>
</td>
<td class="changefreq">
<xsl:value-of select="sitemap:changefreq"/>
</td>
<td class="lastmod text-right">
<xsl:variable name="year" select="substring(sitemap:lastmod,1,4)"/>
<xsl:variable name="month" select="substring(sitemap:lastmod,6,2)"/>
<xsl:variable name="day" select="substring(sitemap:lastmod,9,2)"/>
<time datetime="{sitemap:lastmod}">
<xsl:value-of select="concat($day, '.', $month, '.', $year)"/>
</time>
</td>
</tr>
</xsl:for-each>
</tbody>
</table>
</xsl:if>
<xsl:if test="sitemap:sitemapindex/sitemap:sitemap">
<section>
<h1><span class="tx" data-cs="Sitemapy" data-sk="Sitemapy">Sitemaps</span> (<xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> <xsl:text>&#160;</xsl:text><span class="tx" data-cs="souborů" data-sk="súborov">files</span>)</h1>
<ol class="list-group">
<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
<li class="list-group-item"><a href="{sitemap:loc}">
<xsl:value-of select="sitemap:loc"/>
</a>
</li></xsl:for-each>
</ol>
</section>
</xsl:if>
</main>
<footer class="mt-5">
<div class="container"><p>
<span class="tx" data-cs="Generováno pomocí systému ARL" data-sk="Generované pomocou systému ARL">Generated using the ARL system</span> <xsl:text>&#160;</xsl:text> <i aria-hidden="true" class="icon-arl"></i>, <a rel="external" href="https://www.cosmotron.cz/">Cosmotron Bohemia</a> 2024
</p>
</div></footer>
</div></body></html></xsl:template>
</xsl:stylesheet>