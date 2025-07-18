<?xml version="1.0" encoding="utf-8"?><xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<!-- Sablona pro seznam I3 aplikaci -->
	<xsl:output method="html" version="5.0" doctype-system="about:legacy-compact" omit-xml-declaration="yes" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html lang="en">
			<head>
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charset="utf-8" />
				<meta name="robots" content="noindex,nofollow" />
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
				<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
				<title>App index</title>
				<style>/*
					<![CDATA[ */ /* ]]>*/</style>
			</head>
			<body>
				<div class="jumbotron">
					<div class="container">
						<h1>App index</h1>
						<p>List of i3 apps</p>
					</div>
				</div>
				<div class="container">
					<ul class="list-group">
						<xsl:for-each select="/node/ul[@name='index']/li">
							<xsl:variable name="href" select="@href"/>
							<li class="list-group-item" itemscope="itemscope" itemtype="http://schema.org/WebApplication">
								<a target="_blank" href="{$href}" itemprop="name">
									<xsl:value-of select="."/>
								</a>
							</li>
						</xsl:for-each>
					</ul>
					<hr />
					<footer>
						<p class="text-center">
							<xsl:if test="//node/ul[@name='head']/li[@name='arlinfo']">
								<xsl:variable name="arlinfourl" select="normalize-space(//node/ul[@name='head']/li[@name='arlinfo'])"/>
								<a target="_blank" href="{$arlinfourl}">ARL info</a>
								<xsl:text>,&#xA0;</xsl:text>
							</xsl:if>
							<b>App index</b>
							<xsl:text>,&#xA0;</xsl:text>
							<a target="_blank" rel="external" href="http://www.cosmotron.cz/">Cosmotron</a>
							<xsl:text>,&#xA0;2024</xsl:text>
						</p>
					</footer>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>